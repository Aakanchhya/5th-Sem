

class SubNet {
  constructor(address) {
    if (arguments.length) this.address = address;
  }

  set address(addr) {
    addr = addr.replace(/\s+/g, "");
    // A regexp to to validate IP address
    const ipRegEx =
        /^(([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.){3}([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\/([8-9]|[12][0-9]|30)$/;
    // Throw error if invalid
    if (!ipRegEx.test(addr)) throw new TypeError("Not a valid IP");
    // divide the ip into  respective parts
    let ipArray = addr.split(/\.|\//);

    ipArray.forEach(elem => parseInt(elem, 64));
    // The CIDR is sored at last
    let CIDR = ipArray.pop();
    let givenIP = this.arrToBinary(ipArray);
    // Get the IP class
    let ipClass = this.getClass(ipArray[0]);
    // Find the Default CIDR or subnet mask
    let ipDefaultMask = this.getDefaultSubNet(ipClass);
    // If the class is not A,B,C throw err
    if (ipDefaultMask === -1)
      throw new TypeError(
          `There is no subnetting for class ${ipClass} IP address`);
    if (CIDR < ipDefaultMask)
      throw new TypeError(
          `In class ${ipClass} IP address the CIDR can't be less than ${ipDefaultMask}.`);

    // To get the subnet mask we set the CIDR number of bits from the left in
    // the IP.
    let subnetMask = this.getMask(CIDR);
    // default mask
    let defaultSubNetMask = this.getMask(ipDefaultMask);
    // To get the total possible subnet
    let subNet = 2 ** (CIDR - ipDefaultMask);
    let totalIP = 2 ** (32 - CIDR);
    let totalUsableIP = totalIP - 2;
    let startIp = (defaultSubNetMask & givenIP) >>> 0;
    let list = this.generateSubNets(subNet,totalIP,startIp);

    //IP Print
    document.write("<b>Given IP: </b>",addr,"<br />");
    //SubnetMask
    document.write("<b>Subnet Mask: </b>",this.binaryToString(subnetMask),"<br />");
    //Total Sub Net
    document.write("<b>SubNet: </b>",subNet,"<br />");
    //Total Ip
    document.write("<b>Total IP: </b>",totalIP,"<br />");
    //Usable Ip
    document.write("<b>Usable IP: </b>",totalUsableIP,"<br /><br />");
    //All Sub Networks
    document.write(
        `Table:
        <table border="1">
            <thead>
                <th>S.N</th>
                <th>Network IP</th>
                <th>Usable IP range</th>
                <th>Broadcast IP</th>
            </thead>
            <tbody>

        `
    );

    for(let [index,value] of list.entries()) {
        document.write(
            `<tr>
                <td>${index+1}</td>
                <td>${value.networkIp}</td>
                <td>${value.usableFirst} - ${value.usableLast}</td>
                <td>${value.broadCastIp}</td>
             </tr>
            `
        )
    }
    document.write("</tbody></table><br /><br /><br />")
  }

  generateSubNets(subNet,totalIP,startIp) {
    let arr = [];
    for(let i =0;  i < subNet; i++) {
        arr.push({
            networkIp:this.binaryToString(startIp),
            usableFirst:this.binaryToString(startIp+1),
            usableLast:this.binaryToString(startIp+totalIP-2),
            broadCastIp:this.binaryToString(startIp+totalIP-1),
        })
        startIp += totalIP;
    }
    return arr;
  }



  // selects class depending upon the ranges
  getClass(firstByte) {
    if (firstByte <= 127)
      return "A";
    else if (firstByte <= 191)
      return "B";
    else if (firstByte <= 223)
      return "C";
    else if (firstByte <= 239)
      return "D";
    else
      return "E";
  }
  // Get the default CIDR using the class
  getDefaultSubNet(ipClass) {
    switch (ipClass) {
      case "A":
        return 8;
      case "B":
        return 16;
      case "C":
        return 24;
      default:
        return -1;
    }
  }
  // Binary ip to string
  binaryToString(bin) {
    let arr = [];
    for (let i = 3; i >= 0; i--) {
      arr.push(
          //
          ((0xff << (i * 8)) & bin) >>> (i * 8))
    }
    return arr.join(".");
  }
  // String Ip to binary
  arrToBinary(arr) {
    let val = 0;
    for (let i of arr) {
      val = (((val << 8) >>> 0) | i) >>> 0;
    }
    return val;
  }

  getMask(CIDR) {
    return (((1 << CIDR) | ((1 << CIDR) - 1)) << (32 - CIDR)) >>> 0;
  }
}

let subesh = new SubNet();
subesh.address = "192.168.1.255/24";
 subesh.address = "22.168.1.0/9";
subesh.address = "172.16.0.0/26";
subesh.address = "172.16.0.0/19";
subesh.address = "172.16.0.0/27";
subesh.address = "192.168.1.0/28"
subesh.address = "192.168.1.0/27"
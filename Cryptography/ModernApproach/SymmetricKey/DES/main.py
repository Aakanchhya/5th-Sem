# DES


PC1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44,
       36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4]

PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2,
       41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32]


def getBitAt(key, pos, bit):
    pos = bit - pos
    return ((1 << pos) & key) >> pos


def circularShift(num, shift, bit):
    x = 1 << (shift-1)
    y = bit-shift
    select = (((x | (x - 1)) << y))
    overflow = (num & select) >> y
    num = ((num & ((1 << (bit-1-shift)) | ((1 << (bit-1-shift))-1)))
           << shift) | overflow
    return num


key64 = 0x11133457799BBCDFF1

key56 = 0

for pos in PC1:
    key56 = key56 << 1 | getBitAt(key64, pos, 64)

c = [(key56 & (0xfffffff << 28)) >> 28]
d = [key56 & 0xfffffff]

iteration = [1]+[1 if x % 7 == 0 else 2 for x in range(0, 15)]

for x in iteration:
    c.append(circularShift(c[-1], x, 28))
    d.append(circularShift(d[-1], x, 28))

key = []

for x in range(0, 16):
    temp = (c[x+1] << 28) | d[x+1]
    key.append(0)
    for pos in PC2:
        key[x] = key[x] << 1 | getBitAt(temp,pos, 56)

for x in key:
    print(bin(x) )
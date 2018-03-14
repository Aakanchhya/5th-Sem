#include <iostream>
#include <fstream>
#include <sstream>
#include <iomanip>
#include <chrono>
class UDChecker {

public:
  UDChecker(std::string filename) {
    std::cout << "Opening " << filename << " for Reading ... " << std::endl;

    file.open(filename.c_str());
    if (file) {
      std::cout << "File Exists..\n";
      while (!file.eof()) {
        char a[5];
        int num;
        std::stringstream s;
        file.getline(a, 100, ',');
        s << a;
        s >> num;
        std::cout << num << std::endl;
      }
    } else
      throw "sds";
  }

private:
  std::ifstream file;
};

int main(int argc, char *argv[]) {

  // if (argc != 2) {
  //   std::cout << "You can only pass a file as an argument";
  // } else {
  //   try {
  //     UDChecker checker(argv[1]);
  //     std::cout << "Good";
  //   } catch (...) {
  //     std::cout << "Can't find such file.";
  //     return 0;
  //   }
  // }

  char a = 'a';
  char b = 'b';
  a += b;
  b = a - b;
  a = a - b;
  std::cout << a << b;


  return 0;
}

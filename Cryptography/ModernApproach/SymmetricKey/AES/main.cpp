#include <iostream>
#include <bitset>
#include <stdint.h>
#include <fstream>
#include <Math.h>
class AES {
public:
  AES() {
    file.open("log.md");
    file << "# Log\r\rThis is the log generated by AES Algorithm\r\r";
  }

  void algo(std::string str = "", int mode = 0) {
    // key
    uint8_t key[16];
    // Converting to word
    uint32_t word[44];
    // Array PlainText
    uint8_t plainText[4][4];
    // Array Word
    uint8_t wordByte[11][4][4];

    // Converting the key to 16 byte array
    divideKey(key, 0x0f1571c947d9e859, 0x0cb7add6af7f6798, "Key");

    // Key Expansion Algo
    this->keyExpansion(key, word);

    // Converting  Round keys to 4x4 dimension matrix
    for (int i = 0; i < 11; i++) {
      uint64_t first = ((uint64_t)word[4 * i] << 32) | word[4 * i + 1];
      uint64_t second = ((uint64_t)word[4 * i + 2] << 32) | word[4 * i + 3];
      divideArray(wordByte[i], first, second);
    }

    // Moving to AES Round
    file << "\r## **AES ROUND**\r\r";
    // Converting plain Text and Round keys to 4x4 dimension matrix
    divideArray(plainText, 0x0123456789abcdef, 0xfedcba9876543210);
    printArray(plainText, "Plain Text");

    // printArray(plainText, "Round 0");
    for (int r = 0; r < 10; r++) {
      for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
          plainText[i][j] ^= wordByte[r][i][j];
          plainText[i][j] = this->s[plainText[i][j]];
        }
        this->shiftRows(plainText, i);
      }
      if (r != 9)
        mixColumns(plainText);
      printArray(plainText, std::string("Round") + (char)(r + 48));
    }

    for (int i = 0; i < 4; i++)
      for (int j = 0; j < 4; j++)
        plainText[i][j] ^= wordByte[10][i][j];
    printArray(plainText, "ROUND 10");
  }

  /**************************************
   *          KEY EXPANSION             *
   **************************************/

  void keyExpansion(uint8_t key[16], uint32_t word[44]) {
    for (int i = 0; i < 4; i++) {
      word[i] = key[4 * i];
      word[i] <<= 8;
      word[i] |= key[4 * i + 1];
      word[i] <<= 8;
      word[i] |= key[4 * i + 2];
      word[i] <<= 8;
      word[i] |= key[4 * i + 3];
    }

    for (int i = 4; i < 44; i += 4) {
      auto x1 = rotWord(word[i - 1]);
      auto y1 = subWord(x1);
      auto r1 = (uint8_t)rcon[i / 4 - 1] << 24;
      auto z1 = y1 ^ r1;

      word[i] = word[i - 4] ^ z1;
      word[i + 1] = word[i] ^ word[i - 3];
      word[i + 2] = word[i + 1] ^ word[i - 2];
      word[i + 3] = word[i + 2] ^ word[i - 1];
    }

    file << "## **Key Expansion :**\n\n";
    for (int i = 0; i < 44; i++) {
      if (i % 4 == 0) {
        file << "w" << i << " - w" << i + 3 << "\n";
        file << std::endl;
      }
      printByte(word[i]);
    }
  }

  auto rotWord(auto word) { return ((word << 8) | (word >> 24)); }

  auto subWord(auto x1) {

    for (int i = 0; i < 4; i++) {
      int shift = (32 - ((i + 1) * 8));
      uint8_t pos = (x1 & ((uint32_t)0xff << shift)) >> shift;
      x1 = (x1 & ~((uint32_t)0xff << shift)) | ((uint32_t)s[pos] << shift);
    }
    return x1;
  }
  /* ************************************
  *                ROUND                *
  ************************************* */
  void shiftRows(uint8_t arr[4][4], int row) {
    if (row == 0)
      return;
    uint8_t temp[4] = {0, 0, 0, 0};
    int count = 0;
    while (count != 4) {
      int pos = (count + row) % 4;
      temp[count++] = arr[row][pos];
    }
    for (int i = 0; i < 4; i++) {
      arr[row][i] = temp[i];
    }
  }

  void mixColumns(uint8_t arr[4][4]) {
    uint8_t arr2[4][4];

    for (int i = 0; i < 4; i++) {
      for (int j = 0; j < 4; j++) {
        uint8_t temp = 0;
        for (int k = 0; k < 4; k++) {

          temp ^= getMulVal(arr[k][j], this->mCol[i][k]);
        }
        arr2[i][j] = temp;
      }
    }

    for (int i = 0; i < 4; i++)
      for (int j = 0; j < 4; j++)
        arr[i][j] = arr2[i][j];
  }

  uint8_t getMulVal(uint8_t val, uint8_t mul) {
    switch (mul) {
    case 1:
      return val;
    case 2:
      return this->mul2[val];
    case 3:
      return this->mul3[val];
    default:
      std::cout << "Error " << (int)val << "  ";
    }
    return -1;
  }
  /* ************************************
  *                UTILS                *
  ************************************* */
  void divideKey(uint8_t d_key[16], uint64_t first, uint64_t second,
                 std::string text) {

    file << "**" << text << " :**\n\r    ";
    for (int i = 0; i < 16; i++) {
      int shift = (64 - (((i + 1) % 16) * 8));
      if (i < 8)
        d_key[i] = (first & ((uint64_t)0xff << shift)) >> shift;
      else
        d_key[i] = (second & ((uint64_t)0xff << shift)) >> shift;

      printByte(d_key[i], 1);
    }
    file << "\n\r";
  }

  void divideArray(uint8_t d_text[4][4], uint64_t first, uint64_t second) {
    for (int j = 4 - 1; j >= 0; j--) {
      for (int i = 4 - 1; i >= 0; i--) {
        uint8_t val;
        if (j <= 1) {
          d_text[i][j] = first & 0xff;
          first >>= 8;
        } else {
          d_text[i][j] = second & 0xff;
          second >>= 8;
        }
      }
    }
  }
  auto circularShiftByte(auto word, int shift = 1) {
    int length = sizeof(word);
    return ((word << 8 * shift) | (word >> ((length - 1) * 8 * shift)));
  }

  void printByte(auto word, int mode = 0) {
    unsigned int length = sizeof(word);
    if (!mode)
      file << "    ";
    uint64_t divisor = pow(0x100, (length - 1));
    for (unsigned int i = 0; i < length; i++) {
      uint8_t byteVal = word / divisor;
      word = word % divisor;
      divisor /= 0x100;
      file << std::hex << (int)byteVal
           << ((i != (length - 1) || mode) ? " " : "");
    }
    if (!mode)
      file << "\r";
    file << std::dec;
  }

  void printArray(uint8_t arr[4][4], std::string text) {
    file << "**" << text << " :**\n\r";
    for (int i = 0; i < 4; i++) {
      file << "    ";
      for (int j = 0; j < 4; j++) {
        printByte(arr[i][j], 1);
      }
      file << "\n";
    }
  }

private:
  std::ofstream file;
  const unsigned char rcon[10] = {0x01, 0x02, 0x04, 0x08, 0x10,
                                  0x20, 0x40, 0x80, 0x1b, 0x36};

  const unsigned char s[256] = {
      0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0x2B,
      0xFE, 0xD7, 0xAB, 0x76, 0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0,
      0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0, 0xB7, 0xFD, 0x93, 0x26,
      0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15,
      0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2,
      0xEB, 0x27, 0xB2, 0x75, 0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0,
      0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84, 0x53, 0xD1, 0x00, 0xED,
      0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF,
      0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F,
      0x50, 0x3C, 0x9F, 0xA8, 0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5,
      0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2, 0xCD, 0x0C, 0x13, 0xEC,
      0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73,
      0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14,
      0xDE, 0x5E, 0x0B, 0xDB, 0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C,
      0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79, 0xE7, 0xC8, 0x37, 0x6D,
      0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08,
      0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F,
      0x4B, 0xBD, 0x8B, 0x8A, 0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E,
      0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E, 0xE1, 0xF8, 0x98, 0x11,
      0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF,
      0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F,
      0xB0, 0x54, 0xBB, 0x16};

  unsigned char inv_s[256] = {
      0x52, 0x09, 0x6A, 0xD5, 0x30, 0x36, 0xA5, 0x38, 0xBF, 0x40, 0xA3, 0x9E,
      0x81, 0xF3, 0xD7, 0xFB, 0x7C, 0xE3, 0x39, 0x82, 0x9B, 0x2F, 0xFF, 0x87,
      0x34, 0x8E, 0x43, 0x44, 0xC4, 0xDE, 0xE9, 0xCB, 0x54, 0x7B, 0x94, 0x32,
      0xA6, 0xC2, 0x23, 0x3D, 0xEE, 0x4C, 0x95, 0x0B, 0x42, 0xFA, 0xC3, 0x4E,
      0x08, 0x2E, 0xA1, 0x66, 0x28, 0xD9, 0x24, 0xB2, 0x76, 0x5B, 0xA2, 0x49,
      0x6D, 0x8B, 0xD1, 0x25, 0x72, 0xF8, 0xF6, 0x64, 0x86, 0x68, 0x98, 0x16,
      0xD4, 0xA4, 0x5C, 0xCC, 0x5D, 0x65, 0xB6, 0x92, 0x6C, 0x70, 0x48, 0x50,
      0xFD, 0xED, 0xB9, 0xDA, 0x5E, 0x15, 0x46, 0x57, 0xA7, 0x8D, 0x9D, 0x84,
      0x90, 0xD8, 0xAB, 0x00, 0x8C, 0xBC, 0xD3, 0x0A, 0xF7, 0xE4, 0x58, 0x05,
      0xB8, 0xB3, 0x45, 0x06, 0xD0, 0x2C, 0x1E, 0x8F, 0xCA, 0x3F, 0x0F, 0x02,
      0xC1, 0xAF, 0xBD, 0x03, 0x01, 0x13, 0x8A, 0x6B, 0x3A, 0x91, 0x11, 0x41,
      0x4F, 0x67, 0xDC, 0xEA, 0x97, 0xF2, 0xCF, 0xCE, 0xF0, 0xB4, 0xE6, 0x73,
      0x96, 0xAC, 0x74, 0x22, 0xE7, 0xAD, 0x35, 0x85, 0xE2, 0xF9, 0x37, 0xE8,
      0x1C, 0x75, 0xDF, 0x6E, 0x47, 0xF1, 0x1A, 0x71, 0x1D, 0x29, 0xC5, 0x89,
      0x6F, 0xB7, 0x62, 0x0E, 0xAA, 0x18, 0xBE, 0x1B, 0xFC, 0x56, 0x3E, 0x4B,
      0xC6, 0xD2, 0x79, 0x20, 0x9A, 0xDB, 0xC0, 0xFE, 0x78, 0xCD, 0x5A, 0xF4,
      0x1F, 0xDD, 0xA8, 0x33, 0x88, 0x07, 0xC7, 0x31, 0xB1, 0x12, 0x10, 0x59,
      0x27, 0x80, 0xEC, 0x5F, 0x60, 0x51, 0x7F, 0xA9, 0x19, 0xB5, 0x4A, 0x0D,
      0x2D, 0xE5, 0x7A, 0x9F, 0x93, 0xC9, 0x9C, 0xEF, 0xA0, 0xE0, 0x3B, 0x4D,
      0xAE, 0x2A, 0xF5, 0xB0, 0xC8, 0xEB, 0xBB, 0x3C, 0x83, 0x53, 0x99, 0x61,
      0x17, 0x2B, 0x04, 0x7E, 0xBA, 0x77, 0xD6, 0x26, 0xE1, 0x69, 0x14, 0x63,
      0x55, 0x21, 0x0C, 0x7D};

  const uint8_t mCol[4][4] = {{0x2, 0x3, 0x1, 0x1},
                              {0x1, 0x2, 0x3, 0x1},
                              {0x1, 0x1, 0x2, 0x3},
                              {0x3, 0x1, 0x1, 0x2}};

  const uint8_t mul2[256] = {
      0x00, 0x02, 0x04, 0x06, 0x08, 0x0a, 0x0c, 0x0e, 0x10, 0x12, 0x14, 0x16,
      0x18, 0x1a, 0x1c, 0x1e, 0x20, 0x22, 0x24, 0x26, 0x28, 0x2a, 0x2c, 0x2e,
      0x30, 0x32, 0x34, 0x36, 0x38, 0x3a, 0x3c, 0x3e, 0x40, 0x42, 0x44, 0x46,
      0x48, 0x4a, 0x4c, 0x4e, 0x50, 0x52, 0x54, 0x56, 0x58, 0x5a, 0x5c, 0x5e,
      0x60, 0x62, 0x64, 0x66, 0x68, 0x6a, 0x6c, 0x6e, 0x70, 0x72, 0x74, 0x76,
      0x78, 0x7a, 0x7c, 0x7e, 0x80, 0x82, 0x84, 0x86, 0x88, 0x8a, 0x8c, 0x8e,
      0x90, 0x92, 0x94, 0x96, 0x98, 0x9a, 0x9c, 0x9e, 0xa0, 0xa2, 0xa4, 0xa6,
      0xa8, 0xaa, 0xac, 0xae, 0xb0, 0xb2, 0xb4, 0xb6, 0xb8, 0xba, 0xbc, 0xbe,
      0xc0, 0xc2, 0xc4, 0xc6, 0xc8, 0xca, 0xcc, 0xce, 0xd0, 0xd2, 0xd4, 0xd6,
      0xd8, 0xda, 0xdc, 0xde, 0xe0, 0xe2, 0xe4, 0xe6, 0xe8, 0xea, 0xec, 0xee,
      0xf0, 0xf2, 0xf4, 0xf6, 0xf8, 0xfa, 0xfc, 0xfe, 0x1b, 0x19, 0x1f, 0x1d,
      0x13, 0x11, 0x17, 0x15, 0x0b, 0x09, 0x0f, 0x0d, 0x03, 0x01, 0x07, 0x05,
      0x3b, 0x39, 0x3f, 0x3d, 0x33, 0x31, 0x37, 0x35, 0x2b, 0x29, 0x2f, 0x2d,
      0x23, 0x21, 0x27, 0x25, 0x5b, 0x59, 0x5f, 0x5d, 0x53, 0x51, 0x57, 0x55,
      0x4b, 0x49, 0x4f, 0x4d, 0x43, 0x41, 0x47, 0x45, 0x7b, 0x79, 0x7f, 0x7d,
      0x73, 0x71, 0x77, 0x75, 0x6b, 0x69, 0x6f, 0x6d, 0x63, 0x61, 0x67, 0x65,
      0x9b, 0x99, 0x9f, 0x9d, 0x93, 0x91, 0x97, 0x95, 0x8b, 0x89, 0x8f, 0x8d,
      0x83, 0x81, 0x87, 0x85, 0xbb, 0xb9, 0xbf, 0xbd, 0xb3, 0xb1, 0xb7, 0xb5,
      0xab, 0xa9, 0xaf, 0xad, 0xa3, 0xa1, 0xa7, 0xa5, 0xdb, 0xd9, 0xdf, 0xdd,
      0xd3, 0xd1, 0xd7, 0xd5, 0xcb, 0xc9, 0xcf, 0xcd, 0xc3, 0xc1, 0xc7, 0xc5,
      0xfb, 0xf9, 0xff, 0xfd, 0xf3, 0xf1, 0xf7, 0xf5, 0xeb, 0xe9, 0xef, 0xed,
      0xe3, 0xe1, 0xe7, 0xe5};
  const uint8_t mul3[256] = {
      0x00, 0x03, 0x06, 0x05, 0x0c, 0x0f, 0x0a, 0x09, 0x18, 0x1b, 0x1e, 0x1d,
      0x14, 0x17, 0x12, 0x11, 0x30, 0x33, 0x36, 0x35, 0x3c, 0x3f, 0x3a, 0x39,
      0x28, 0x2b, 0x2e, 0x2d, 0x24, 0x27, 0x22, 0x21, 0x60, 0x63, 0x66, 0x65,
      0x6c, 0x6f, 0x6a, 0x69, 0x78, 0x7b, 0x7e, 0x7d, 0x74, 0x77, 0x72, 0x71,
      0x50, 0x53, 0x56, 0x55, 0x5c, 0x5f, 0x5a, 0x59, 0x48, 0x4b, 0x4e, 0x4d,
      0x44, 0x47, 0x42, 0x41, 0xc0, 0xc3, 0xc6, 0xc5, 0xcc, 0xcf, 0xca, 0xc9,
      0xd8, 0xdb, 0xde, 0xdd, 0xd4, 0xd7, 0xd2, 0xd1, 0xf0, 0xf3, 0xf6, 0xf5,
      0xfc, 0xff, 0xfa, 0xf9, 0xe8, 0xeb, 0xee, 0xed, 0xe4, 0xe7, 0xe2, 0xe1,
      0xa0, 0xa3, 0xa6, 0xa5, 0xac, 0xaf, 0xaa, 0xa9, 0xb8, 0xbb, 0xbe, 0xbd,
      0xb4, 0xb7, 0xb2, 0xb1, 0x90, 0x93, 0x96, 0x95, 0x9c, 0x9f, 0x9a, 0x99,
      0x88, 0x8b, 0x8e, 0x8d, 0x84, 0x87, 0x82, 0x81, 0x9b, 0x98, 0x9d, 0x9e,
      0x97, 0x94, 0x91, 0x92, 0x83, 0x80, 0x85, 0x86, 0x8f, 0x8c, 0x89, 0x8a,
      0xab, 0xa8, 0xad, 0xae, 0xa7, 0xa4, 0xa1, 0xa2, 0xb3, 0xb0, 0xb5, 0xb6,
      0xbf, 0xbc, 0xb9, 0xba, 0xfb, 0xf8, 0xfd, 0xfe, 0xf7, 0xf4, 0xf1, 0xf2,
      0xe3, 0xe0, 0xe5, 0xe6, 0xef, 0xec, 0xe9, 0xea, 0xcb, 0xc8, 0xcd, 0xce,
      0xc7, 0xc4, 0xc1, 0xc2, 0xd3, 0xd0, 0xd5, 0xd6, 0xdf, 0xdc, 0xd9, 0xda,
      0x5b, 0x58, 0x5d, 0x5e, 0x57, 0x54, 0x51, 0x52, 0x43, 0x40, 0x45, 0x46,
      0x4f, 0x4c, 0x49, 0x4a, 0x6b, 0x68, 0x6d, 0x6e, 0x67, 0x64, 0x61, 0x62,
      0x73, 0x70, 0x75, 0x76, 0x7f, 0x7c, 0x79, 0x7a, 0x3b, 0x38, 0x3d, 0x3e,
      0x37, 0x34, 0x31, 0x32, 0x23, 0x20, 0x25, 0x26, 0x2f, 0x2c, 0x29, 0x2a,
      0x0b, 0x08, 0x0d, 0x0e, 0x07, 0x04, 0x01, 0x02, 0x13, 0x10, 0x15, 0x16,
      0x1f, 0x1c, 0x19, 0x1a};
};

int main(int args, char *argv[]) {
  AES a;
  a.algo();
  return 0;
}

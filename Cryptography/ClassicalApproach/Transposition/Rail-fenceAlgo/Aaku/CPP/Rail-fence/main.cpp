#include <iostream>
#include <string>
#include <math.h>

using namespace std;

class Rail_Fence
{
public:
    string encryption(string,int);
    string decryption(string,int);
    string removeWhiteSpace(string);
};

string Rail_Fence::removeWhiteSpace(string symbol)
{
    string sym = "";
    for(int i=0; i<symbol.length(); i++)
    {
        if(symbol[i] == ' ')
        {
            continue;
        }
        sym += symbol[i];
    }
    return sym;
}

string Rail_Fence::encryption(string sym, int number)
{
    string symbol;
    symbol = removeWhiteSpace(sym);
    cout << endl << "I am inside Encryption" << endl ;
    int num = 0 ;
    float key;
    string cipher = "";
    float length = symbol.length();
    key = ceil(length/number);
    for(int i=0; i<number; i++)
    {
        num = i;
        for(int j=0; j<key; j++)
        {
                if(num >= length)
                {
                    cipher += '#';
                    continue;
                }
                cipher += symbol[num];
                num += number;
        }
    }
    return cipher;
}

string Rail_Fence::decryption(string symbol, int number)
{
    cout << endl << "I am inside Decryption" << endl ;
    int key;
    key = symbol.length()/number ;
    int num;
    string plainText ="";

    for(int i=0; i<key; i++)
    {
        num = i;
        for(int j=0; j<number; j++)
        {
            plainText += symbol[num];
            num += key;
        }
    }
    return plainText;
}

int main()
{
    Rail_Fence R;
    string encryptedCode, decryptedCode;
    encryptedCode = R.encryption("he is most wanted Criminal",3);
    cout << "Encrypted Code = " << encryptedCode << endl ;
    decryptedCode = R.decryption(encryptedCode,3);
    cout << "Decrypted Code = " << decryptedCode << endl ;
    return 0;
}

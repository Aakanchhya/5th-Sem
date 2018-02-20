#include <iostream>
#include <string>
#include <math.h>

using namespace std;

class Rail_Fence
{
public:
    string straightEncrypt(string,int);
    string straightDecrypt(string,int);
    string daigonalEncrypt(string,int);
    string diagonalDecrypt(string,int);
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

string Rail_Fence::straightEncrypt(string sym, int number)
{
    string symbol;
    symbol = removeWhiteSpace(sym);
    cout << endl << "I am inside straight Encryption" << endl ;
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

string Rail_Fence::straightDecrypt(string symbol, int number)
{
    cout << endl << "I am inside straight Decryption" << endl ;
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

string Rail_Fence::daigonalEncrypt(string sym, int number)
{
    cout << "I am inside diagonal Encryption" << endl ;
    string symbol = removeWhiteSpace(sym);
    string cipher[100];
    for(int i=0; i<100; i++)
    {
        cipher[i] = "";
    }

    string cipherText = "";

    //Looping to get cipher text
    int row = 0;
    int count = 0;

    for(int column=0; column<symbol.length(); column++)
    {
        cout << endl << "I am inside i loop: column = " << column << endl ;
        if(count < number)
        {
            cout << endl << "Inside if";
            cipher[row] += symbol[column];
            cout << endl << "cipher = " << cipher[row] ;
            cout << endl << "row = " << row << endl ;
            row++;
            count++;
        }
        else
        {
            if(row == number)
            {
                row--;
            }
            cout << endl << "Inside else";
            row--;
            cipher[row] += symbol[column];
            cout << endl << "cipher = " << cipher[row] ;
            cout << endl << "row = " << row << endl;
            count ++;
            if(row == 0)
            {
                count =1;
                row = 1;
            }
        }
    }

    cout << row ;

    for(int i=0; i<number; i++)
    {

    }

    //Concatinating strings
    for(int i=0; i<number; i++)
    {
        cipherText += cipher[i];
    }

    return cipherText;
}

int main()
{
    Rail_Fence R;
    string encryptedCode, decryptedCode;
    encryptedCode = R.straightEncrypt("he is most wanted Criminal",3);
    cout << "Encrypted Code = " << encryptedCode << endl ;
    decryptedCode = R.straightDecrypt(encryptedCode,3);
    cout << "Decrypted Code = " << decryptedCode << endl ;

    string encrypt ;
    encrypt = R.daigonalEncrypt("they will attack on tomorrow",3);
    cout << endl << encrypt;
    return 0;
}

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
    cout << endl << "I am inside diagonal Encryption" << endl ;
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
    int check = 0;

    for(int column=0; column<symbol.length(); column++)
    {
        if(count < number)
        {
            cipher[row] += symbol[column];
            row++;
            count++;
            check = 1;
        }
        else
        {
            if(row == number)
            {
                row--;
            }
            row--;
            cipher[row] += symbol[column];
            count ++;
            if(row == 0)
            {
                count =1;
                row = 1;
            }
            check = 2;
        }
    }

    //Adding *
    if(check == 2)
    {
        for(int i=row; i>0; i--)
        {
            cipher[row-1] += '*';
        }
    }
    if(check == 1)
    {
        for(int i=row; i<number; i++)
        {
            cipher[row+1] += '*';
        }
    }

    //Concatinating strings
    for(int i=0; i<number; i++)
    {
        cipherText += cipher[i];
    }

    return cipherText;
}

string Rail_Fence::diagonalDecrypt(string sym, int number)
{
    cout << endl << "I am inside diagonal Decryption" << endl ;
    string symbol = removeWhiteSpace(sym);
    string cipher[100][100];
    for(int i=0; i<100; i++)
    {
        for(int j=0; j<100; j++)
        {
            cipher[i][j] = " ";
        }
    }
    string cipherText = " ";

    //Calculating gaps
    int gaps = 0;
    if(number == 2)
        gaps = 1;
    else if(number == 3)
        gaps = 3;
    else
    {
        if(number % 2 == 0)
            gaps = number+1;
        else
            gaps = number+2;
    }

    int row = 0;
    for(int column = 0; column < symbol.length(); column++)
    {
        int col = 0 ;
        if(row == 0)
        {
            cipher[row][col] = symbol[column];
            col += gaps;
            if(col >= symbol.length())
                row++;
        }
    }
}

int main()
{
    Rail_Fence R;

    //Straight Rail_Fence
    string encryptedCode, decryptedCode;
    encryptedCode = R.straightEncrypt("he is most wanted Criminal",3);
    cout << "Encrypted Code = " << encryptedCode << endl ;
    decryptedCode = R.straightDecrypt(encryptedCode,3);
    cout << "Decrypted Code = " << decryptedCode << endl ;

    //Diagonal Rail_Fence
    string encrypt ;
    encrypt = R.daigonalEncrypt("they will attack on tomorrow",3);
    cout << "Encrypted Code = " << encrypt << endl ;
    return 0;
}

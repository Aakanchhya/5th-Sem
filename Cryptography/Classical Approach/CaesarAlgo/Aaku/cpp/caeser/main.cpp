#include <iostream>
#include <string>

using namespace std;

class caeser
{
public:
    string encrypt(string,int);
    string decrypt(string,int);
};

string caeser::encrypt(string symbol, int key)
{
    for(int i=0; i<symbol.length(); i++)
    {
        if(symbol[i]>=97 && symbol[i]<=123)
        {
            int ascii;
            ascii = (int)symbol[i];
            ascii = ((ascii - 97 + key)%26)+97;
            symbol[i] =  (char)ascii;
        }
        if(symbol[i]>=65 && symbol[i]<=90)
        {
            int ascii;
            ascii = (int)symbol[i];
            ascii = ((ascii - 65 + key)%26)+65;
            symbol[i] =  (char)ascii;
        }
        if(symbol[i] == ' ')
        {
            symbol[i] = ' ';
        }
    }
    return symbol;
}

string caeser::decrypt(string symbol,int key)
{
    for(int i=0; i<symbol.length(); i++)
    {
        if(symbol[i]>=97 && symbol[i]<=122)
        {
            int ascii;
            ascii = (int)symbol[i];
            ascii = ((ascii - 97 - key + 26)%26)+97;
            symbol[i] =  (char)ascii;
        }
        if(symbol[i]>=65 && symbol[i]<=90)
        {
            int ascii;
            ascii = (int)symbol[i];
            ascii = ((ascii - 65 - key + 26)%26)+65;
            symbol[i] =  (char)ascii;
        }
        if(symbol[i] == ' ')
        {
            symbol[i] = ' ';
        }
    }
    return symbol;
}

int main()
{
    caeser C;
    string encryptedCode;
    encryptedCode = C.encrypt("hello",3);
    cout << endl << "Encrypted Code = " << encryptedCode << endl;
    string decryptedCode;
    decryptedCode = C.decrypt("h knud xnt zzjzmbggxz",25);
    cout << endl << "Drcrypted Code = " << decryptedCode << endl ;
    return 0;
}

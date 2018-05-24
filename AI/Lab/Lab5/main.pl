addThreeAndDouble(X,Y):-
    Y is (X+3)*2.

len([],0).
len([_|L], N):-
    len(L,X),N is X + 1.

acclen([],Acc,Length):-
    Length=Acc.

acclen([_|L],OldAcc,Length):-
    NewAcc is OldAcc + 1,acclen(L,NewAcc,Length).



fibo(0,0).
fibo(1,1).
fibo(N,Acc):-
    N1 is N-1,
    N2 is N-2,
    fibo(N1,R1),
    fibo(N2,R2),
    Acc is R1 + R2.


fact(0,1).
fact(N,Acc):-
    N1 is N-1,
    fact(N1,R1),
    Acc is N * R1.

gcd(N1,0,Acc):- Acc=N1.
gcd(N1,N2,Acc):-
    X is N1 mod N2, 
    gcd(N2,X,Acc).

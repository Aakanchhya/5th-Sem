isTaller(ram,shyam).

isTaller(shyam,hari).

isTaller(gopal,ram).

isTall(X,Y):-isTaller(X,Y).

isTall(X,Y):-isTaller(X,Z),isTall(Z,Y).

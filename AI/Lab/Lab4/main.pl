isDigesting(X,Y):- justAte(X,Y).
isDigesting(X,Y):- justAte(X,Z), isDigesting(Z,Y).
justAte(mosquito,blood(john)).
justAte(frog,mosquito).
justAte(stork,frog).
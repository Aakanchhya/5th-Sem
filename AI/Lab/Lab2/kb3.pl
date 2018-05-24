woman(mia).
woman(jody).
woman(yolanda).
loves(vincent,mia).
loves(marsellus,mia).
loves(pumkin,honey_bunny).
loves(honey_bunny,pumkin).
jealous(X,Y):- loves(X,Z),loves(Y,Z).

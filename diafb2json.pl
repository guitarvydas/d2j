:- consult(fb).

:- dynamic edge/2.
:- dynamic ellipse/2.
:- dynamic rect/2.
:- dynamic text/2.


kind(V,edge):-edge(V,_).
kind(V,ellipse):-ellipse(V,_).
kind(V,rect):-rect(V,_).
kind(V,text):-text(V,_).

elements(D,Bag):-bagof(V,element(D,V),Bag).

elementAlways(D,E,K,X,Y,W,H,Text):-
    diagram(D,_),
    diagramContains(D,E),
    vertex(E,_),
    kind(E,K),
    x(E,X),
    y(E,Y),
    width(E,W),
    height(E,H),
    value(E,Text).
element(D,Descriptor):-
    elementAlways(D,E,K,X,Y,W,H,Text),
    fillColor(E,Fill),
    Descriptor = descriptor{fillColor:Fill,kind:K,x:X,y:Y,width:W,height:H,text:Text,id:E}.
element(D,Descriptor):-
    elementAlways(D,E,K,X,Y,W,H,Text),
    \+ fillColor(E,_),
    Descriptor = descriptor{kind:K,x:X,y:Y,width:W,height:H,text:Text,id:E}.
element(D,Descriptor):-
    diagram(D,_),
    diagramContains(D,E),
    edge(E,_),
    source(E,Source),
    target(E,Target),
    Descriptor = descriptor{id:E,kind:edge,source:Source,target:Target}.

drawing(D,DiagramDescriptor):-
    diagram(D,_),
    name(D,Name),
    setof(Desc,element(D,Desc),ElementSet),
    DiagramDescriptor = dd{name:Name,elements:ElementSet}.


:- use_module(library(http/json)).
allDrawings:-
    bagof(DD,drawing(_,DD),DiaBag),
    json_write(user_output,DiaBag).

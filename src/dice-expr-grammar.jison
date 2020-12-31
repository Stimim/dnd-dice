/* lexical grammar */
%lex
%%

\s+         /* skip whitespace */
[0-9]+      return 'NUMBER'
"+"         return '+'
"-"         return '-'
[d]         return 'd'
<<EOF>>     return 'EOF'
.           return 'INVALID'

/lex


/* operator associations and precedence */

%left '+' '-'
%left 'd'
%left UDICE
%left UMINUS UPLUS

%start expressions

%% /* lanugage grammar */

expressions
  : e EOF
    { console.log($1); return $1; }
  ;

e
  : e '+' e
    { $$ = diceExprAdd($1, $3); }
  | e '-' e
    { $$ = diceExprSub($1, $3); }
  | NUMBER 'd' NUMBER
    { $$ = diceExprMakeDice(Number($1), Number($3)); }
  | '-' e %prec UMINUS
    { $$ = diceExprSub(0, $2); }
  | '+' e %prec UPLUS
    { $$ = diceExprAdd(0, $2); }
  | 'd' e %prec UDICE
    { $$ = diceExprMakeDice(1, Number($2)); }
  | NUMBER
    { $$ = Number(yytext); }
  ;

%%

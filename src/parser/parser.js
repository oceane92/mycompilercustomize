module.exports = tokens => {
    var AST = { body: [] };
    var last_token = 0;

    while (tokens.length > 0) {
        var current_token = tokens.shift();

        switch(current_token.type){

            case 'variable':

                var expression = {
                    type: 'VariableDeclarationExpression',
                    identifier: last_token.value,
                    value: current_token.value
                }
                AST.body.push(expression);
                break;

            case 'line-break':
                var expression = {
                    type: 'LineBreakException',
                    identifier: last_token.value,
                    value: current_token.value
                }
                AST.body.push(expression);
                break;

            case 'equal':
                if(last_token.type!="identifier" && last_token.type!="equal" && last_token.type!="exclpoint" && last_token.type!="operator"
                    && last_token.type!="variable" && last_token.type!="operator") {

                    throw "Left statement must be a variable"
                } else {
                    var expression = {
                        type: 'VariableAssignationExpression',
                        identifier: last_token.value,
                        value: ''
                    }

                    AST.body.push(expression);

                }
                break;

            case 'instruction-end':
                break;
            case 'parenthesis-start':
                var expression = {
                    type: 'ParenthesisStartExpression'
                }

                AST.body.push(expression);
                break;
            case 'parenthesis-end':
                var expression = {
                    type: 'ParenthesisEndExpression'
                }

                AST.body.push(expression);
                break;
            case 'curlybracket-start':
                var expression = {
                    type: 'CurlybracketStartExpression'
                }
                AST.body.push(expression);
                break;
            case 'curlybracket-end':
                var expression = {
                    type: 'CurlybracketEndExpression'
                }
                AST.body.push(expression);
                break;

        }

        last_token = current_token
        //current_token = next;
    }
    return AST;
}
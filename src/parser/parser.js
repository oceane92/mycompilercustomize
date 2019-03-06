module.exports = tokens => {
    var AST = { body: [] };
    var last_token = 0;

    while (tokens.length > 0) {
        var current_token = tokens.shift();
        console.log(last_token.value + " | " + current_token.value)

        switch(current_token.type){

            case 'variable':

                var expression = {
                    type: 'VariableDeclarationExpression',
                    identifier: last_token.value,
                    value: current_token.value
                }
                AST.body.push(expression);
                break;

            case 'equal':
                if(last_token.type!="variable" && last_token.type!="equal" && last_token.type!="exclpoint") {
                    throw "Left statement must be a variable"
                } else {
                    var expression = {
                        type: 'VariableAssignationExpression',
                        identifier: last_token.value,
                        value: ''
                    }

                    /*current_token= next;
                    switch(next.type){
                        case 'object-string':
                        case 'number':
                        case 'number-float':
                            expression.value = next;
                            break;
                        default:
                    }*/
                    AST.body.push(expression);

                }
                break;

            case 'instruction-end':
                break;
            case 'parenthesis-start':
                var expression = {
                    type: 'ParenthesisStartExpression'
                }
                console.log(current_token.type)
                AST.body.push(expression);
                break;
            case 'parenthesis-end':
                var expression = {
                    type: 'ParenthesisEndExpression'
                }
                console.log(current_token.type)
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
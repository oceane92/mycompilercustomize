module.exports = ast => {
    var rapport = [] ;
    var expressions = ast.body;
    var variables = []
    var types = []
    var parenthesis_index = 0
    var curlybracket_index = 0
    //add rapport note of expressions;



    while (expressions.length > 0) {
        var current_expression = expressions.shift();
        switch(current_expression.type){
            case 'VariableDeclarationExpression':
                variables.push(current_expression.value)
                types.push(current_expression.identifier)
                break;
            case 'VariableAssignationExpression':
                if (!variables.includes(current_expression.value)){
                    throw "Left statement must be a variable"
                }
                break;

            case 'ParenthesisStartExpression':
                parenthesis_index++
                break;

            case 'ParenthesisEndExpression':
                parenthesis_index--
                break;

            case 'CurlybracketStartExpression':
                curlybracket_index++
                break;

            case 'CurlybracketEndExpression':
                curlybracket_index--
                break;
        }
        rapport.push({ 'type' : current_expression.type,
            'note' : 5});
    }
    if (parenthesis_index != 0) {
        throw "Missing parenthesis"
    }
    if (curlybracket_index != 0) {
        throw "Missing curlybracket"
    }

    return rapport;
}
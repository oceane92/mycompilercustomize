//Etablissement d'un rapport sur le code si il est compilé
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
                if (!variables.includes(current_expression.identifier) && current_expression.identifier != '=' && current_expression.identifier != '!'
                    && current_expression.identifier != '<' && current_expression.identifier != '>'){
                    throw "Left statement must be a variable"
                }
                break;

            case 'LineBreakException':
                if (current_expression.identifier!=';' && current_expression.identifier!='}' && current_expression.identifier!=':'
                    && current_expression.identifier!='\n' && current_expression.identifier!='{') {
                    throw "Missing EOL before carriage return"
                }
                break;

            case 'ParenthesisStartExpression':
                parenthesis_index = parenthesis_index + 1
                break;

            case 'ParenthesisEndExpression':
                parenthesis_index = parenthesis_index - 1
                break;

            case 'CurlybracketStartExpression':
                curlybracket_index = curlybracket_index + 1
                break;

            case 'CurlybracketEndExpression':
                curlybracket_index = curlybracket_index - 1
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
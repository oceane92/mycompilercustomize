module.exports = ast => {
    var rapport = [] ;
    var expressions = ast.body;
    var variables = []
    var types = []
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

            case 'ConsoleUseMethodExpression':
                //check if method exists
                //check arguments
                break;
        }
        rapport.push({ 'type' : current_expression.type,
            'note' : 5});
    }
    return rapport;
}
module.exports = tokens => {
    var AST = { body: [] };
    var last_token = null;
    while (tokens.length > 0) {
        var current_token = tokens.shift();
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log(last_token)
        console.log(current_token)

        switch(current_token.type){

            case 'variable':

                var expression = {
                    type: 'VariableDeclarationExpression',
                    identifier: last_token.value,
                    value: current_token.value
                }
                var next = tokens.shift();
                current_token = next;
                AST.body.push(expression);

                break;

            case 'equal':
                if(last_token.type!="variable") {
                    throw "Left statement must be a variable"
                } else {
                    var expression = {
                        type: 'VariableAssignationExpression',
                        identifier: current_token.value,
                        value: ''
                    }
                    var next = tokens.shift();
                    current_token= next;
                    switch(next.type){
                        case 'object-string':
                        case 'number':
                        case 'number-float':
                            expression.value = next;
                            break;
                        default:
                            throw 'You have to assign a known type to variable '+last_token.value;
                    }
                    AST.body.push(expression);

                }
                break;

            case 'console-object':
                var next = tokens.shift();
                current_token= next;
                if(next.type=="point"){
                    var expression = {
                        type: 'ConsoleUseMethodExpression',
                        methode: '',
                        arguments: [],
                    }
                    next = tokens.shift();
                    current_token= next;
                    if(next.type==="identifier"){
                        expression.methode= next.value;
                        next = tokens.shift();
                        current_token= next;
                        if(next.type==="parenthesis-start"){
                            var isEnding= false;
                            do{
                                next= tokens.shift();
                                current_token= next;
                                switch(next.type){
                                    case 'object-string':
                                    case 'number':
                                    case 'number-float':
                                    case 'identifier':
                                        expression.arguments.push(next);
                                        break;
                                    case 'parenthesis-end':
                                        isEnding= true;
                                        break
                                    case 'virgule':
                                        break;
                                    default:
                                        throw 'Error of using arguments';
                                }
                            }while(next.type!="parenthesis-end" && tokens.length > 0);
                            if(!isEnding){
                                throw 'You have to close parenthesis when you use method.';
                            }else{
                                AST.body.push(expression);
                            }
                        }else{
                            throw 'You have to use parenthesis to use method.';
                        }

                    }else{
                        throw 'You have to define a identifier for a variable.';
                    }
                }
                break;
            case 'instruction-end':
            case 'line-break':
                break;

        }
        last_token= current_token;
    }
    return AST;
}
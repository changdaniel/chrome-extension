export function useSlot(children){
    let returnObject = {
        default:[]
    }

    if(!Array.isArray(children))
        children = [children]

    children.forEach(child => {
        if(child.props.slot){
            returnObject[child.props.slot] = child
            return 
        }
        returnObject.default.push(child)
    });

    return returnObject
}
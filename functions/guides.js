exports.handler = async (event, context) => {
    const guides = [
        {title: 'Beat all zelda booses like a boos', author: 'mario'},
        {title: 'MArio kart shortcuts you never knew existed', author: 'luigi'},
        {title: 'ultimate street fighter guide', author: 'boo'},
    ]

    if (context.clientContext.user){
        return {
            statusCode: 200,
            body: JSON.stringify(guides)
        }
    }

    return {
        statusCode:401,
        body: JSON.stringify({mssg: 'need to be loged to see it'})
    }
}
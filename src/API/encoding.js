/**
 * Здесь я просто щаменяю сиволы для кодирования
    ENCODING / 
 
    Специальные символы:
    
    Зарезервированные символы	; , / ? : @ & = + $
    Неэкранируемые символы	    латинские буквы, десятичные цифры, - _ . ! ~ * ' ( )
    Score	                    #
 */

 function encoding (decodedContent) {

    decodedContent.toString(); 
    decodedContent = decodedContent 
        .replace(/;/g, 'special1')
        .replace(/\//g,'special3')
        .replace(/\?/g,'special4')
        .replace(/:/g, 'special5')
        .replace(/@/g, 'special6')
        .replace(/&/g, 'special7')
        .replace(/=/g, 'special8')
        .replace(/\+/g,'special9')
        .replace(/\$/g,'specialA0')
        .replace(/\%/g,'specialA1')
        .replace(/\^/g,'specialA2')
        .replace(/\"/g,'specialA3')
        .replace(/№/g, 'specialA4')
        .replace(/#/g, 'specialA5')
        .replace(/`/g, 'specialA6')

    return encodeURI(decodedContent);
 }

 function decoding (encodedContent) {

    encodedContent = decodeURI(encodedContent)
    encodedContent = encodedContent
        .replace(/special1/g, ';' )
        .replace(/special2/g, ',' )
        .replace(/special3/g, '\/') 
        .replace(/special4/g, '?' )
        .replace(/special5/g, ':' )
        .replace(/special6/g, '@' )
        .replace(/special7/g, '&' )
        .replace(/special8/g, '=' )
        .replace(/special9/g, '+' )
        .replace(/specialA0/g, '$')
        .replace(/specialA1/g, '%')
        .replace(/specialA2/g, '^')
        .replace(/specialA3/g, '"')
        .replace(/specialA4/g, '№')
        .replace(/specialA5/g, '#')
        .replace(/specialA6/g, '`')

    return encodedContent;
 }

export default {
    encoding,
    decoding,
}


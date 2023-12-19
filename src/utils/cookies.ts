type CookieProps = {
    path?: string;
    expires?: number | Date | string;
    [key: string]: any;
};

export function setCookie(name: string, value: string, props: CookieProps = {}): void {
    props = {
        path: '/',  //задаем корневой адрес для cookies
        ...props
    };
    let exp: number | Date | string = props.expires || new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 12);// время жизни 1 год
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp instanceof Date) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;

    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string): void {
    setCookie(name, '', {expires: -1});
}

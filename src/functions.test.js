import { createEvent } from './functions'

beforeAll(() => { 
    /*global.Date.now = jest.fn(() => new Date('2021-12-07T10:20:30Z').getTime()) */
});

const weekday = "mon";
const week = 1;
const openHour=8;
const closeHour=14

test('Validation a event title and content basic', () => {    
    const result = createEvent(weekday, week, openHour, closeHour);
    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring and Practice");
    expect(result.duration).toEqual([6, 'hour']);
});

test('Validation start date', () => {
    const numDay = NUM_DAY[weekday];
    const currentDay = new Date().getDay();
    const date = getDateCalendar(numDay,currentDay)    
    const result = createEvent(weekday, week, openHour, closeHour);
    expect(result.start).toEqual(date);
});

test('Validation date', () => {
    /* 
        para esta validacion es necesario que se utilice la funcion 
        getDateCalendar con su dependecia ya que de esa funcion depende 
        el retorno del dia esa es la razon de traernos estas funciones
        y tambien la constante numDay desde el componente
    */
    const currentDay = new Date().getDay();
    const numDay = NUM_DAY[weekday];
    const date = getDateCalendar(numDay, currentDay);    
    const start = new Date(date).toLocaleDateString('es-ES', options);    
    const result = createEvent(weekday, week, openHour, closeHour);    
    expect(result.date).toEqual(start);    
});

test('Validation illegal arguments', () => {
    /* 
        los argumentos ilegales dependen de los parametros de entrada, 
        viendo este caso en particular tenemos 3 parametros de entrada:
        -Weekday
        -Week
        -openHour&closeHour
        por lo tanto estos son los argumentos que debemos validar
    */
});

test('Ilegal argument weekday',()=>{
    /*
        un argumento ilegal para weekday sera si pasan un parametro
        (nombre del dia) que no este dentro de la constante NUM_DAY
    */
    const error = () => {
        createEvent('hola', week, openHour, closeHour);
    };        
    expect(error).toThrow(Error);

});

test('Ilegal argument week',()=>{
    /*
        un argumento ilegal para week seria si el numero es negativo,
        ya que asi esta definido en el componente function. 
    */
    const error = () => {
        createEvent(weekday, -100, openHour, closeHour);
    };
    expect(error).toThrow(Error);

});


test('Ilegal argument openHour&closeHour ', () => {
    /*
        un error en openHour&closeHour seria si la diferencia entre ambas horas da
        como resultado cero o menos, asi esta definido en el componente.
    */
    const error = () => {
        createEvent(weekday, week, 10, 5);
    };
    expect(error).toThrow(Error);
});


test('create an event list of at least 10 events', () => {
    const listEvent = [
        {
            weekday: 'mon',
            week: 1,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'tue',
            week: 2,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'wed',
            week: 3,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'thu',
            week: 4,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'mon',
            week: 5,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'tue',
            week: 1,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'wed',
            week: 8,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'thu',
            week: 1,
            openHour: 8,
            closeHour: 14
        }
        
    ]
});


function addDays(days) {
    return new Date(new Date().setDate(new Date().getDate() + days));
}

function getDateCalendar(numDay, currentDay) {
    if (numDay >= currentDay && parseInt(closeHour) >= hour) {//posterior a dia de la semana
        return addDays((numDay - currentDay) + 7 * (week - 1));
    }
    return addDays((numDay - currentDay) + 7 * (week - 1));
}

const NUM_DAY = { 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6, 'sun': 7 };
const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
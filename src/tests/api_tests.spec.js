// import { PORT } from '../lib/API/index';
const PORT = 3001; 
import fetch from 'node-fetch';

const badRequest = (message = "Invalid syntax for this request was provided.") => {
    return {
        "message": "test_set does not exist",
        "details": {},
        "description": "The reference set does not exist.",
        "code": 1002,
        "http_response": {
            "message": message,
            "code": 400
        }
    }
}

const notFound = (message = "We could not find the resource you requested.") => { // sem mensagens personalizadas
    return {
        "message": "test_set does not exist",
        "details": {},
        "description": "The reference set does not exist.",
        "code": 1002,
        "http_response": {
            "message": message,
            "code": 404
        }
    }
}
 
const runTests = (okArray, notFoundArray, getName, queryStringKey) => {
    const requestVariations = [
        okArray,
        [
            [
                '?',
                ' ',
                '?.#=',
                '!@#!@',
            ],
            [
                encodeURI('\r\n\t\f '),
                encodeURI('⠀'),
            ]
        ],
        notFoundArray
    ];

    describe(`${getName} Request test`, () => {
        let fetchUrl = async (inputTest) => await fetch(`http://localhost:${PORT}/${getName}?${queryStringKey}=${inputTest}`);

        for(let variation = 0; variation < requestVariations.length; variation++) {

            if(variation == 0){
                for(let input of requestVariations[variation]){
                    test(`Return 200 as status with the input '${input}'`, async () => {
                        const res = await fetchUrl(input)
                        expect(res.status).toEqual(200);

                    })
                }
            } else if(variation == 1){
                for(let input of requestVariations[variation][0]){
                    test(`Return a Bad Request error and 400 as status with the input '${input}'`, async () => {
                        const res = await fetchUrl(input)
                        const json = await res.json();
                        
                        expect(json).toEqual(badRequest());
                        expect(res.status).toEqual(400);
                    })
                }

                for(let input of requestVariations[variation][1]){ // trocar [1] por 'blank space', usando um obj no lugar de arr no requestVariations
                    test(`Return a Bad Request error (with blank space message) and 400 as status with the input '${input}'`, async () => {
                        const res = await fetchUrl(input)
                        const json = await res.json();
                        
                        expect(json).toEqual(badRequest('The input you provided is a blank space.'));
                        expect(res.status).toEqual(400);
                    })
                }
            } else {
                for(let input of requestVariations[variation]){
                    test(`Return a Not Found error and 404 as status with the input '${input}'`, async () => {
                        const res = await fetchUrl(input)
                        const json = await res.json();
                        
                        expect(res.status).toEqual(404);
                        expect(json).toEqual(notFound());
                    })
                }
            }
        }
    });
}

const testParameters = {
    productName: {
        validQueries: [
            'aciclovir',
            'AcIcLoViR',
            ' sódico',
            '500mg',
        ],
        notFoundQueries: [
            'yyyyyyyy',
            '1234567abcdef',
            '09123579171237851',
        ],
        get_name: 'get_by_productName',
        queryStringKey: 'name'
    },
    active: {
        validQueries: [
            'aciclovir',
            'AcIcLoViR',
            ' aciclovir',
            '90%',
        ],
        notFoundQueries: [
            'yyyyyyyy',
            '1234567abcdef',
            '09123579171237851',
        ],
        get_name: 'get_by_active',
        queryStringKey: 'subs'
    },
    barCode: {
        validQueries: [
            '7896004708362', // EAN 1
            '   7891106913904  ', // EAN 2
            '7896004772349', // EAN 3
        ],
        notFoundQueries: [
            '4496004708362',
            '1234567000039',
            '09123579171237851',
        ],
        get_name: 'get_by_bar_code',
        queryStringKey: 'code'
    },
    ggrem: {
        validQueries: [
            '526120110126207',
            '   538912050012813  ',
            '508017100119606',
        ],
        notFoundQueries: [
            '4496004708362',
            '1234567000039',
            '09123579171237851',
        ],
        get_name: 'get_by_ggrem',
        queryStringKey: 'ggrem'
    }
}

for(let route in testParameters){
    let a = testParameters[route].validQueries
    let b = testParameters[route].notFoundQueries
    let c = testParameters[route].get_name
    let d = testParameters[route].queryStringKey

    runTests(a, b, c, d);
}
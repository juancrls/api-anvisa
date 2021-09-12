import fs from 'fs';
import parse from 'csv-parse';

const file = `${process.cwd()}/TA_PRECO_MEDICAMENTO.csv` // arquivo
let csvData = [];

fs.createReadStream(file)
    .pipe(parse({delimiter: ',', from: 2}))
    .on('error', (err) => console.log(err))
    .on('data', (csvRow) => {
        csvData.push({
            'substance': csvRow[0],
            'cnpj': csvRow[1],
            'lab': csvRow[2],
            'ggrem_code': csvRow[3],
            'register': csvRow[4],
            'ean_1': csvRow[5],
            'ean_2': csvRow[6],
            'ean_3': csvRow[7],
            'product': csvRow[8],
            'presentation': csvRow[9],
            'therapeutic_class': csvRow[10],
            'product_type-status': csvRow[11],
            'price_regime': csvRow[12],
            'pharma_price_without_tax': csvRow[13],
            'pharma_price_0%': csvRow[14],
            'pharma_price_12%': csvRow[15],
            'pharma_price_17%': csvRow[16],
            'pharma_price_17%_alc': csvRow[17],
            'pharma_price_17,5%': csvRow[18],
            'pharma_price_17,5%_alc': csvRow[19],
            'pharma_price_18%': csvRow[20],
            'pharma_price_18%_alc': csvRow[21],
            'pharma_price_20%': csvRow[22],
            'maximum_consumer_price_0%': csvRow[23],
            'maximum_consumer_price_12%': csvRow[24],
            'maximum_consumer_price_17%': csvRow[25],
            'maximum_consumer_price_17%_alc': csvRow[26],
            'maximum_consumer_price_17,5%': csvRow[27],
            'maximum_consumer_price_17,5%_alc': csvRow[28],
            'maximum_consumer_price_18%': csvRow[29],
            'maximum_consumer_price_18%_alc': csvRow[30],
            'maximum_consumer_price_20%': csvRow[31],
            'hospital_restriction': csvRow[32],
            'cap': csvRow[33],
            'confaz_87': csvRow[34],
            'icms_0%': csvRow[35],
            'resource_analysis': csvRow[36],
            'list_of_tax_credit_grant_(pis/cofins)': csvRow[37],
            'commercialization_2019': csvRow[38],
            'strip': csvRow[39],
        })

        let lastCsvDataRow = csvData[csvData.length - 1]
        for(let item in lastCsvDataRow){

            if(Number(lastCsvDataRow[item].replace(/,/g, '.'))) {
                lastCsvDataRow[item] = Number(lastCsvDataRow[item].replace(/,/g, '.'))
            }
        
            if(lastCsvDataRow[item] == '' || typeof lastCsvDataRow[item] == 'string' && lastCsvDataRow[item].replace(/ /g, '') == '-') {
                lastCsvDataRow[item] = null
            }
        
            if(lastCsvDataRow[item] == 'Não') {
                lastCsvDataRow[item] = false
            }
        
            if(lastCsvDataRow[item] == 'Sim') {
                lastCsvDataRow[item] = true
            }
        }
    })
    .on('end',function() {
        csvData.shift();
        fs.writeFile('../API/DADOS.json', JSON.stringify(csvData), err => {
            if(err) console.log(err)
        });
        console.log(csvData[0])
    });
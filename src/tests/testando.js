let string = "500mg"

if(!/[^a-zA-Z0-9\s]+/g.test(string) || /\d+%/g.test(string)){
    console.log('oi')
}
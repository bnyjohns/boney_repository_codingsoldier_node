class Data{
    getName(){
        return "Ram";
    }
}

class Employee{
    constructor(data){
        this._data = data;
    }

    getName(){
        return this._data.getName();
    }

    getAge(){
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve(13);
            }, 1000);
        })
    }
}

describe('canary suite', function(){
    it('canary test', function(){

        var data = new Data();
        var mockData = sinon.mock(data);        
        mockData.expects('getName').returns('Raj');

        var emp = new Employee(data); //here is the variation. I expected to pass 'mockData' here instead of 'data'
        expect(emp.getName()).equals('Raj');
        mockData.verify();
        mockData.restore();
    });

    it('canary Promise Test', function(done){

        var data = new Data();
        var mockData = sinon.mock(data);        
        //mockData.expects('getName').returns('Raj');

        var emp = new Employee(data);
        emp.getAge()
        .then(function(a){
            expect(a).equals(13);
            done();
        });
    });
});

import { Column, Table, SCHEMA } from "../../common/schema";
import { isArrayEqual } from "../../common/util";
/* TODO: 
1) Fetch data only if last modified data has been changed and store it as cache here
2) Consider Singleton pattern 
*/

class Repository {

    private  data!: {[table in Table]:object[][]};

    private constructor() {
        this.data = {
            "requests":undefined,
            "data-collector":undefined
        }
    }

    getRowIndex() {

    }

    fetchData(table: Table) {
        if(this.data[table]!==undefined){
            
        }
    }






}
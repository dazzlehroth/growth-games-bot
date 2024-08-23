import sqlite3 from 'sqlite3'

// const SqlString = require('sql-string');

/*****************************************************************************************
 ****************************** DB Initializer
 *****************************************************************************************/

const db = new sqlite3.Database('DB.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});


/*****************************************************************************************
 ****************************** LOCAL Functions
 *****************************************************************************************/

/**
 * @description Takes object of fields and conditions and converts to a where statement string
 * @param conditions
 */
function constructWhereCondition(conditions: Object): string {

    if (Object.keys(conditions).length === 0)
        return ""

    let whereStatement = "WHERE ";

    for (let condition of Object.entries(conditions)) {

        //Check start condition value to see if we defined the comparator, add = to start if we did not
        switch (condition[1][0]) {
            case '!':
            case '<':
            case '>':
            case '=':
                break;
            default:
                condition[1] = `= ${condition[1]}`;
        }


        whereStatement += `${condition[0]} ${(condition[1])} AND `;
    }

    //Snap off the last AND
    return whereStatement.substring(0, whereStatement.length - 5)

}

/*****************************************************************************************
 ****************************** CRUD Functions
 *****************************************************************************************/


/**
 * @description Insert 1 record into the specified table
 * @param tableName
 * @param data
 */
export async function dbInsert(tableName: string, data: Object) {
    return new Promise<void>(async (resolve, reject) => {

        let columns = Object.keys(data).flat();
        let values = Object.values(data).flat();

        const query = `INSERT INTO ${tableName} (${columns})
                       values (${values})` //Escaped above

        try {
            db.run('begin transaction');
            db.run(query);
            db.run('commit');
            resolve();
        } catch (err) {
            console.error(err);
            db.run('ROLLBACK');
            reject();
        }
    })
}



/**
 * @description Gets first record from table matching given criteria
 * @param tableName
 * @param conditions
 */
export async function dbSelectRowSingle(tableName: string, conditions: Object) {
    return new Promise((resolve, reject) => {

        const query = `SELECT *
                       FROM ${tableName}
                       ${constructWhereCondition(conditions)}`;

        try {

            db.get(query, (err, response) => {
                console.log(response);
                resolve(response);
            })
        } catch (e) {
            reject(e)
        }
    })
}



/**
 * @description Gets  all records from table matching given criteria
 * @param tableName
 * @param conditions
 */
export async function dbSelectRowsAll(tableName: string, conditions: Object = {}) {
    return new Promise<Array<object>>((resolve, reject) => {

        const query = `SELECT *
                       FROM ${tableName}
                       ${constructWhereCondition(conditions)}`;

        try {
            db.all(query, (err: Error, response:Array<Object>) => {

                resolve(response);
            })
        } catch (e) {
            reject(e)
        }
    })
}


export async function dbUpdateRecordByID(table: string, id: number, dataToChange: Object) {
    return new Promise<void>((resolve, reject)  => {

        let setStatement = ""

        for (let item of Object.entries(dataToChange)) {
            setStatement += `${item[0]} = ${item[1]}`
        }

        const query = `UPDATE ${table} SET ${setStatement} WHERE id = ${id}`

        try {
            db.run('BEGIN TRANSACTION')
            db.run(query);
            db.run('COMMIT')
            resolve();
        } catch (e) {
            console.error(e)
            db.run('ROLLBACK');
            reject();

        }



    })


}
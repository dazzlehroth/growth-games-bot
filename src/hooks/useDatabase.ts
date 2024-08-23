import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('DB.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});


export function dbInsert(tableName: string, data: Object) {

    let columns = Object.keys(data).flat();
    let values = Object.values(data).flat();

    const query = `INSERT INTO ${tableName} (${columns})
                   values (${values})`

    console.log(query);

    try {
        db.run('begin transaction')
        db.run(query);
        db.run('commit')
    } catch (err) {
        console.error(err);
        db.run('ROLLBACK')
    }
}

export async function dbSelectObject(tableName: string, conditions: Object) {
    return new Promise((resolve, reject) => {

    let whereStatement = "";
    console.log(conditions)

    //TODO: Handle other comparisons than equals
    for (let condition of Object.entries(conditions)) {
        console.log(condition)
        whereStatement += `"${condition[0]}" = ${condition[1]} AND`;
    }

    //Snap off the last AND
    whereStatement = whereStatement.substring(0, whereStatement.length - 4)

    const query = `SELECT * FROM ${tableName} WHERE ${whereStatement}`;

    console.log(query)

    try {
        let result
        db.get(query, (err, response) => {

            console.log(response)
            resolve(response);
            result = response
        })
    } catch (e) {
        reject(e)
    }
    })
}
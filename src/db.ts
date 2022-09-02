import { Pool } from 'pg';

const createTablePool = new Pool();
createTablePool.query(
    `CREATE TABLE IF NOT EXISTS public.supportees
    (id SERIAL PRIMARY KEY, userid TEXT, status TEXT, category TEXT);`, (err, res) => { createTablePool.end() }
);

const check = function(
    userid: any,
    category: any,
    callback: (arg0: any) => void,
) {
  const pool = new Pool();
  pool.query(`select * from supportees where (userid = ` +
    `${userid} or id = ${userid}) ` +
    `${category ? `AND category = '${category}'` : ''}`, (err, res) => { callback(res.rows); pool.end() });
};

const getOpen = function(
    userid: string | number,
    category: string | null,
    callback: Function,
) {
  const pool = new Pool();
  pool.query(`select * from supportees where (userid = ` +
    `'${userid}' or id = '${userid}') AND status='open' ` +
    `${category ? `AND category = '${category}'` : ''}`,
    (err, res) => {
      if (!res.rows.length) {
        pool.query(`insert into public.supportees(userid, status, category) VALUES ('${userid}', 'open', '${category}');SELECT currval('supportees_id_seq') AS id;`, 
          (err, inserted) => {
            callback([inserted]);
            pool.end()
          })
      } else {
        callback(res.rows[0]);
        pool.end()
      }
    });
};

const getId = function(
    userid: number,
    callback: {
    (ticket: { userid: any; id: { toString: () => string } }): void;
    (ticket: {
      userid: any;
      /* verbose: console.log */
      id: /* verbose: console.log */ { toString: () => string };
    }): void;
    (ticket: { userid: any; id: { toString: () => string } }): void;
    (arg0: any): void;
  },
) {
  const pool = new Pool();
  pool.query(`select * from supportees where (userid = ` +
    `${userid} or id = ${userid})`, (err, res) => { callback(res.rows.length ? res.rows[0] : undefined); pool.end() });
};

const checkBan = function(
    userid: any,
    callback: { (ticket: any): any; (arg0: any): void },
) {
  const pool = new Pool();
  pool.query(`select * from public.supportees where (userid = '${userid}' or id = '${userid}') AND status='banned' `,
    (err, res) => {
      callback(res.rows.length ? res.rows[0] : undefined);
      pool.end();
    });
};

const closeAll = function () {
  const pool = new Pool();
  pool.query(`UPDATE supportees SET status='closed'`, () => pool.end());
};

const reopen = function (userid: any, category: string) {
  const pool = new Pool();
  pool.query(`UPDATE supportees SET status='open'` +
    `WHERE userid='${userid}' or id='${userid}'` +
    `${category ? `AND category = '${category}'` : ''}`, () => pool.end());
};

const add = function(
    userid: string | number,
    status: string,
    category: string | number | null,
) {
  var pool = new Pool();
  if (status == 'closed') {
    pool.query(
      `UPDATE supportees SET status='closed' WHERE ` +
      `(userid='${userid}' or id='${userid}')` +
      `${category ? `AND category = '${category}'` : ''}`,
      () => pool.end());
  } else if (status == 'open') {
    // db.prepare(`DELETE FROM supportees WHERE userid='${userid}'` +
    //    ` or id='${userid}'`).run();
    pool
      .query(
        `REPLACE INTO supportees (userid, ` +
        `status ${category ? `,category` : ''}) ` +
        `VALUES ('${userid}', '${status}' ${category ? `,'${category}'` : ''})`,
        () => pool.end());
  } else if ((status = 'banned')) {
    pool.query(
      `REPLACE INTO supportees (userid, status, category)` +
      `VALUES ('${userid}', '${status}', 'BANNED')`,
      ()=> pool.end()
    );
  }
};

const open = function(
    callback: {
    (userList: {
      [x: string]: {
        [x: string]: {
          toString: () => {
            (): any;
            new (): any;
            indexOf(/* verbose: console.log */ arg0: string): any;
            padStart: {
              (
                // debugging
                arg0: number,
                arg1: string
              ): {
                (): any;
                new (): any;
                toString: { (): string; new (): any };
              };
              new (): any;
            };
          };
        };
      };
    }): void;
    (tickets: string | any[]): void;
    (arg0: any): void;
  },
    category: string | any[],
) {
  let searchText = '';
  for (let i = 0; i < category.length; i++) {
    if (i == 0) {
      searchText += `= '${category[i]}'`;
    } else {
      searchText += ` OR category = '${category[i]}'`;
    }
  }

  const pool = new Pool();
  pool.query(
    `select * from supportees where status = 'open' ` +
    `and (category ${category.length > 0 ? searchText : 'is NULL'})`,
    (err, res) => { callback(res.rows); pool.end() });
};

export {open, add, check, getOpen, checkBan, getId, closeAll, reopen};

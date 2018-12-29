import pymysql


def cursor_datas(sql,dbname):
        # 连接数据库
    try:
        db = pymysql.connect(host="localhost", user="root",passwd="0030", database=dbname, charset='utf8')
        cursor = db.cursor()
        #print('connectsuccess')
    except:
        print('Oops..there is some error')

    try:
        cursor.execute(sql)
        db.commit()
        results = cursor.fetchall()
        return results
    except:
        print('error')
        db.rollback()

    
    db.close()
    

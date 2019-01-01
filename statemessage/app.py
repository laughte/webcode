from flask import Flask, request, render_template,jsonify
import pymysql
import time

app = Flask(__name__)
app.config.from_object('config')

@app.route('/', methods=['GET', ])
def index():
    return render_template('box.html')

@app.route('/message', methods=['POST', ])
def get_form():
   #连接数据库
    db = pymysql.connect("localhost", "root", "0030", "mymessage-db")
    cursor = db.cursor()

    #获取当前时间
    t= time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    try:
        #获取用户输入的信息
        name = request.form['username']
        content = request.form['comment']

        # 往数据库存数据
        ins = "INSERT INTO `allmessage`(`name`,`content`,`time`)VALUE('"+name+"','"+content+"','"+t+"');"
        cursor.execute(ins)
        db.commit()
         #从数据库取数据
        alldata = "SELECT * FROM allmessage;"
        cursor.execute(alldata)
        datas = cursor.fetchall()
        # tuple([data::-1]) 倒序排列
        data = tuple(datas[::-1])[0]
    except:
        #从数据库取数据
        alldata = "SELECT * FROM allmessage;"
        cursor.execute(alldata)
        datas = cursor.fetchall()
        # tuple([data::-1]) 倒序排列
        data = tuple(datas[::-1])
    return jsonify(data)

    # 关闭数据库连接
    db.close()




if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=app.config['DEBUG'], port=8000)

from connectDB import cursor_datas
from flask import Flask, request, render_template, jsonify,redirect
import sys
import os
import pymysql
import time
sys.path.append('../')


app = Flask(__name__)
app.config.from_object('config')

@app.route('/', methods=['GET','post' ])
def get_name():
    #获取登陆用户信息
    ip = request.remote_addr
    useragent = request.headers.get('User-Agent')
    print(ip,useragent)
     #从数据库取图片数据
    alltable = 'show tables'
    dbname='sex_picture'
    datas = cursor_datas(alltable,dbname)
    tablesname = tuple(datas[::-1])
    datalist=[]
    for i in tablesname:
        alldata = "SELECT * FROM `"+i[0]+"`;"
        data =cursor_datas(alldata,dbname)
        datalist.append(data)
    a = datalist
    b = tablesname
    alldata = list(zip(a, b))
    data = alldata[0:50]
    return render_template('picture.html', data=data)
    

@app.route('/getmore', methods=['GET','post' ])
def getmore():
 
    alltable = 'show tables'
    dbname='sex_picture'
    datas = cursor_datas(alltable,dbname)
    tablesname = tuple(datas[::-1])
    datalist=[]
    for i in tablesname:
        alldata = "SELECT * FROM `"+i[0]+"`;"
        data =cursor_datas(alldata,dbname)
        datalist.append(data)
    a = datalist
    b = tablesname
    alldata = list(zip(a, b))
    max = request.form['numbmax']
    data = alldata[0:50*max]
    return jsonify(data)


@app.route('/checkname', methods=['POST', ])
def ajax_cheak():
    name = request.form['name']
    #print(f"name:{name}")
    at = '@'
    if at in name :
        sql = "SELECT * FROM userlist WHERE email = '%s' " % (name)
    else:
        sql = "SELECT * FROM userlist WHERE name = '%s' " % (name)

    # 执行SQL语句
    dbname='user-info'
    results = cursor_datas(sql,dbname)
    reqname = []
    for i in results:
        reqname.append(i[1]+i[2])
    #print(f'results:{results}')
    return jsonify(reqname)

@app.route('/checkmail', methods=['POST', ])
def ajax_cheak2():
    name = request.form['name']
    #print(f"name:{name}")   
    sql = "SELECT * FROM userlist WHERE email = '%s' " % (name)
    dbname='user-info'
    # 执行SQL语句
    results = cursor_datas(sql,dbname)
    reqmail = {}
    for i in results:
        reqmail = i[2]
    #print(f'results:{results}')
    return jsonify(reqmail)
   

@app.route('/checktel', methods=['POST', ])
def ajax_cheak3():
    name = request.form['name']
    
    # print(f"name:{name}")
    sql = "SELECT * FROM userlist WHERE tel = '%s' " % (name)
    dbname='user-info'
    # 执行SQL语句
    results = cursor_datas(sql,dbname)
    reqtel = {}
    for i in results:
        reqtel = i[3]
    # print(f'results:{results}')
    return jsonify(reqtel)



@app.route('/like',methods=['POST',])
def ajax_insertdb():
    title = request.form['name']
    href = request.form['href']
    likenumber = request.form['like']
    #print(title,href,likenumber)   
    data = "UPDATE "+title+" SET likenumber = likenumber+1 WHERE href = '%s' " %(href)
    #data = "UPDATE "+title+" SET likenumber = likenumber + 1 WHERE href = "+href+""
    dbname='sex_picture'
    req = cursor_datas(data,dbname)
    return jsonify(req)

@app.route('/messageboard',methods=['POST',]) 
def message():
    dbname='user-info'
    #name = request.form['username']
    #从数据库取数据
    sql = "SELECT * FROM messageboard;"
    datas = cursor_datas(sql,dbname)
    data = tuple(datas[::-1])       
    #return render_template('messageboard.html', data=data, username=name)
    return jsonify(data)

@app.route('/creatmsgboard',methods=['POST',])
def creatmsgboard():
    dbname = 'user-info'
    t= time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    msg = request.form['comment']
    name = request.form['username']
    top, down = '0', '0'
    # 往数据库存数据
    ins = "INSERT INTO `messageboard`(`name`,`message`,`time`,`top`,`down`)VALUE('"+name+"','"+msg+"','"+t+"','"+top+"','"+down+"');"
    cursor_datas(ins,dbname)
    #从数据库取数据
    sql = "SELECT * FROM messageboard;"
    datas = cursor_datas(sql,dbname)
    #datas[-1] 每次请求最后一项数据
    return jsonify(datas[-1])


@app.route('/messageinfo',methods=['POST','']) 
def messageinfo():
    content = request.form['content']
    dowhat = request.form['dowhat']
    D = int(dowhat)
    sql = ''
    if D == 666:
        sql = "UPDATE messageboard SET top = top + 1 WHERE message = '%s' " % (content)
    elif D == 333:
        sql = "DELETE FROM messageboard WHERE message = '%s'" % (content)
    else:
        sql = "UPDATE messageboard SET down = down + 1 WHERE message = '%s' " % (content)
    dbname='user-info'
    data  = cursor_datas(sql,dbname)
    return jsonify(data)


@app.route('/signinform', methods=['POST', ])
def signin():
    #从数据库取图片数据
    # alltable = 'show tables'
    # dbname='sex_picture'
    # datas = cursor_datas(alltable,dbname)
    # tablesname = tuple(datas[::-1])
    # datalist=[]
    # for i in tablesname:
    #     alldata = "SELECT * FROM `"+i[0]+"`;"
    #     data =cursor_datas(alldata,dbname)
    #     datalist.append(data)
    # a = datalist
    # b = tablesname
    # data = list(zip(a, b))

    #从网页post用户数据
    subvalue = request.form['subvalue'] 
    username = request.form['username']
    password = request.form['password']
    email = request.form['email']
    tel = request.form['tel']
    print(subvalue)
    if subvalue == '注册':
        # 获取当前时间
        t = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    
        #print(f"name:{name}")
        sql = "SELECT * FROM userlist WHERE name = '%s' " % (username )  
        dbname='user-info' 
        # 执行SQL语句
        results = cursor_datas(sql,dbname)
        # 往数据库写数据
        ins = "INSERT INTO `userlist`(`name`,`password`,`email`,`tel`,`time`) VALUES ('" + \
            username+"','"+password+"','"+email+"','"+tel+"','"+t+"');"   
        cursor_datas(ins,dbname)
        print(username)      
        return jsonify('注册成功',username)
    else:
        at = '@'
        if at in username :
            sql = "SELECT * FROM userlist WHERE email = '%s' " % (username)
        else:
            sql = "SELECT * FROM userlist WHERE name = '%s' " % (username)

        # 执行SQL语句
        dbname='user-info'
        results = cursor_datas(sql,dbname)
        if results == ():
            return jsonify(('用户名不存在请检查后在输入',))
        else:
            for i in results:
                name = i[1]
                pasd = i[4]
                if password == pasd:
                    print(name)
                    return jsonify('登陆成功',name)
                else:
                    # print(f'results:{results}')
                    return jsonify(('账号或密码错误请重新登陆',))


if __name__ == '__main__':

    app.run(host='127.0.0.1', debug=app.config['DEBUG'], port=80)

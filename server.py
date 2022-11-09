from flask import Flask, render_template, redirect, request, session, url_for, Response, jsonify
import database_manager
import authentication

app = Flask(__name__)

app.secret_key = "123"


@app.route("/")
def main_page():
    if "user" in session:
        return render_template('home.html', username=session["user"])
    return render_template('home.html', username="")


@app.route('/planets-stats')
def planet_stats():
    get_planets = database_manager.get_planets()
    return jsonify(get_planets)


@app.route("/login", methods=["GET", "POST"])
def login():
    if "user" in session:
        return render_template('login.html', username=session["user"])
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        users = database_manager.get_users()
        if username == "" or password == "":
            return render_template('login.html', message="Please, fill in both fields!", username="")
        if username not in users:
            return render_template('login.html', message="Wrong username or password", username="")
        if not authentication.check_password(users[username], password):
            return render_template('login.html', message="Wrong username or password", username="")
        else:
            session["user"] = username
            return redirect(url_for("main_page"))
    return render_template('login.html', username="")


@app.route("/register", methods=["GET", "POST"])
def register():
    if "user" in session:
        return render_template("register.html", message="", username=session["user"])
    if request.method == "POST":
        new_username = request.form["username"]
        new_password = request.form["password"]
        users = database_manager.get_users()
        if new_username == "" or new_password == "":
            return render_template('register.html', message="Please, fill in both fields!", username="")
        if new_username not in users:
            new_hashed_password = authentication.generate_hash(new_password)
            database_manager.register_user(new_username, new_hashed_password)
            return render_template("login.html", message="Successful registration. Log in to continue.", username="")
        return render_template("register.html", message="Username already exists, please choose another one!", username="")
    return render_template("register.html", message="", username="")


@app.route('/data', methods=["POST"])
def data():
    planet = request.json
    p_name = planet.get('name')
    get_planets = database_manager.get_planets()
    planet_list = []
    for i in get_planets:
        planet_list.append(i["name"])
    if p_name in planet_list:
        database_manager.update_vote(p_name)
    else:
        database_manager.add_vote(p_name)
    return Response(status=204)


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("main_page"))


if __name__ == '__main__':
    app.run(debug=True, port=8000)

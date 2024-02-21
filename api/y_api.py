import os
from dotenv import load_dotenv
from flask import Flask
from flask_socketio import SocketIO, emit, join_room, leave_room, close_room
from y_chat_history import YChatHistory

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_APP_KEY")
socketio = SocketIO(app, cors_allowed_origins='*')

@socketio.on('join')
def on_join(data):
    user = data['user']
    room = data['room']
    join_room(room)
    history = YChatHistory()
    recoveredHistory = history.get_history(room)
    if len(recoveredHistory) > 0 :
        emit("restorehistory", recoveredHistory, broadcast=False)
    emit('sysmessage', {"user":"System", "message":f"{user} just joined!"}, broadcast=True, to=room)


@socketio.on('leave')
def on_leave(data):
    user = data['user']
    room = data['room']
    leave_room(room)
    emit('sysmessage', {"user":"System", "message":f"{user} just left room!"}, broadcast=True, to=room)


@socketio.on('connect')
def handle_connect():
    print("Client connected")


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


@socketio.on("message")
def handle_message(data):
    room = data['room']
    history = YChatHistory()
    history.insert_history(data)
    emit("message", data, broadcast=True, to=room)


if __name__ == '__main__':
    history = YChatHistory()
    #history.drop_db()
    history.create_db()
    socketio.run(app, debug=os.getenv("FLASK_DEBUG_ON") == "1", port=os.getenv("API_PORT"))
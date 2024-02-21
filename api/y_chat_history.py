import os
import sqlite3
from datetime import datetime

class YChatHistory:
    """Class for handling chat room history and database."""
    def __init__(self) -> None:
        self.connString = "chatHistory.db"

    def drop_db(self):
        """Drop all tables from database."""
        conn = sqlite3.connect(self.connString)
        cursor = conn.cursor()
        droppings = [
             "DROP TABLE IF EXISTS history;",
             "DROP TABLE IF EXISTS usage;"
        ]
        for stmt in droppings:
            cursor.execute(stmt)
            conn.commit()
        conn.close()
        self.__recreate_db_file()

    def create_db(self):
        """Initialize table for chat messages if it does not exists."""
        conn = sqlite3.connect(self.connString)
        cursor = conn.cursor()
        creations = [
        """CREATE TABLE IF NOT EXISTS "history" (
            "id"	INTEGER NOT NULL UNIQUE,
            "user"	TEXT NOT NULL,
            "message"	TEXT NOT NULL,
            "room"	TEXT NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT)
        );
        """,
        """CREATE TABLE IF NOT EXISTS "usage" (
            "room"	TEXT NOT NULL UNIQUE,
            "last_access_time"	TEXT NOT NULL,
            PRIMARY KEY("room")
        );
        """
        ]

        for stmt in creations:
            cursor.execute(stmt)
            conn.commit()
        conn.close()
    
    def insert_history(self, data)->None:
        """Insert message in chat history table."""
        conn = sqlite3.connect(self.connString)
        cursor = conn.cursor()
        statement = "INSERT INTO history (user, message, room) VALUES (?,?,?)"
        cursor.execute(statement, (data["user"], data["message"], data["room"]))
        conn.commit()
        conn.close()
        self.__update_last_access_time(data["room"])
    
    def get_history(self, room)->list:
        """Get all chat messages that belong to room."""
        conn = sqlite3.connect(self.connString)
        cursor = conn.cursor()
        statement = "SELECT user, message, room FROM history WHERE room=?;"
        result = cursor.execute(statement, (room,))
        data = result.fetchall()
        returnList = []
        conn.close()
        for user, message, room in data:
            returnList.append({"user": user, "message": message, "room": room})
        return returnList

    def __update_last_access_time(self, room):        
        """Insert message in chat history table."""
        conn = sqlite3.connect(self.connString)
        cursor = conn.cursor()
        statement = """DELETE FROM usage WHERE room=?;"""
        cursor.execute(statement, (room,))
        conn.commit()
        time = datetime.now().strftime("%Y-%m-%d")
        statement = """INSERT INTO usage (room, last_access_time) VALUES (?,?);"""
        cursor.execute(statement, (room, time))
        conn.commit()
        conn.close()

    def __recreate_db_file(self):
        """Re create database file."""
        try:
            os.remove(self.connString)
        except FileNotFoundError as e:
            print(e)
        # Create file
        with open(self.connString, "w+") as _:
            pass
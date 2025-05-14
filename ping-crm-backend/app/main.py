"""Starting point of the application"""
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app import models, crud
from app.routers import organizations, contacts
from sqlalchemy.orm import Session
from app.database import get_db
from app.seed import seed_data

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(organizations.router)
app.include_router(contacts.router)

# @app.on_event("startup")
# def startup_event():
#     db = next(get_db())
#     seed_data(db)

drop table if exists my_life_calendar;
create table users (
    id integer primary key autoincrement,
    email text not null,
    age integer not null
)

create table resolutions (
    id integer primary key autorincrement,
    userid integer,
    weeknum integer,
    text text,
    foreign key (userid) references users(id)
)

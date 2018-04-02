drop table if exists my_life_calendar;
create table users (
    id integer primary key autoincrement,
    email text not null,
    age integer not null
);

create table tasks (
    id integer primary key autoincrement,
    userid integer,
    weeknum integer,
    yearnum integer,
    name text,
    text text,
    foreign key (userid) references users(id)
);

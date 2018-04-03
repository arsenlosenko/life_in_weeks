drop table if exists my_life_calendar;
create table user (
    id integer primary key autoincrement,
    email text not null,
    age integer not null
);

create table task (
    id integer primary key autoincrement,
    user_id integer,
    week_num integer,
    year_num integer,
    name text,
    text text,
    foreign key (user_id) references users(id)
);

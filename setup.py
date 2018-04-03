from setuptools import setup

setup(
    name='my_life_calendar',
    packages=['mlc'],
    include_package_data=True,
    install_requires=[
        'flask','flask_sqlalchemy'
    ],
)

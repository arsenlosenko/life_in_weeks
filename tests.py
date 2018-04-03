import unittest
from unittest import TestCase
from mlc import app

class TestViews(TestCase): 
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True 

    def tearDown(self):
        pass 

    def test_index_view(self):
        result = self.app.get('/') 
        self.assertEqual(result.status_code, 200) 

if __name__ == "__main__":
    unittest.main()



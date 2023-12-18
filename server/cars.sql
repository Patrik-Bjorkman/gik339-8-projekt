DROP TABLE IF EXISTS cars;
CREATE TABLE IF NOT EXISTS cars(
   id        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,regNum VARCHAR(8) NOT NULL
  ,model  VARCHAR(20) NOT NULL
  ,manuFact  VARCHAR(16) NOT NULL
  ,manuFactYear INTEGER(4) NOT NULL
  ,color VARCHAR(6) NOT NULL
);
INSERT INTO cars(id,regNum,model,manuFact,manuFactYear,color) VALUES (1,'ABC123','Ursus S','Lamborghini','2023','red');
INSERT INTO cars(id,regNum,model,manuFact,manuFactYear,color) VALUES (2,'HGE456','LS','Lexus','2022','White');

select * from cars;
DROP TABLE IF EXISTS cars;
CREATE TABLE IF NOT EXISTS cars(
   id        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,regNum VARCHAR(8) NOT NULL
  ,model  VARCHAR(20) NOT NULL
  ,manufact  VARCHAR(16) NOT NULL
  ,manufactYear INTEGER(4) NOT NULL
  ,color VARCHAR(6) NOT NULL
  ,fuel VARCHAR(6) NOT NULL
);
INSERT INTO cars(id,regNum,model,manuFact,manufactYear,color,fuel) VALUES (1,'ABC123','Ursus S','Lamborghini','2023','Red','Bensin');
INSERT INTO cars(id,regNum,model,manuFact,manufactYear,color,fuel) VALUES (2,'HGE456','LS','Lexus','2022','Vit','Hybrid');

select * from cars;
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
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (1,'ABC123','Ursus S','Lamborghini','2023','Red','Petrol');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (2,'HGE456','LS','Lexus','2022','White','Diesel');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (3,'SOS112','XC70','Volvo','2016','Black','Diesel');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (4,'YHD182','Passat','Volkswagen','2017','Blue','Petrol');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (5,'BZB857','530d','BMW','2011','Brown','Diesel');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (6,'ECP45E','E500','Mercedes-Benz','2014','Green','Petrol');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (7,'CMJ64P','Model S','Tesla','2019','Yellow','Electricity');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (8,'OHT208','Tiguan','Volkswagen','2017','Grey','Diesel');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (9,'EAE96U','Ceed','Kia','2022','Brown','Flex Fuel/Hybrid');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (10,'YUL255','V90','Volvo','2021','White','Diesel');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (11,'ARA20C','Sorento','Kia','2020','Green','Petrol');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (12,'HXL331','335i','BMW','2011','Black','Petrol');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (13,'FDL47C','Model X','Tesla','2019','Yellow','Electricity');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (14,'AAH31K','812','Ferrari','2022','Red','Petrol');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (15,'NHW399','E220','Mercedes-Benz','2014','Grey','Diesel');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (16,'EME299','V60','Volvo','2016','Blue','Petrol');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (17,'OHS24E','308','Peugeot','2022','Black','Petrol');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (18,'JSS314','E-Golf','Volkswagen','2017','White','Electricity');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (19,'CTL496','Focus','Ford','2010','Green','Diesel');
INSERT INTO cars(id,regNum,model,manufact,manufactYear,color,fuel) VALUES (20,'SKG55J','V60','Volvo','2019','Yellow','Flex Fuel/Hybrid');
select * from cars;
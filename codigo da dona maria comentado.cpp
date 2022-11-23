//program by Shubham Shinganapure on 05-08-2019
//
//for Line Following Robot using 2IR sensors  
int lm1=8;    //left motor output 1
int lm2=9;    //left motor output 2
int rm1=10;   //right motor output 1
int rm2=11;   //right motor output 2
int sl=13;    //sensor 1 input (left)
int sr=12;    //sensor 2 input (right)
int SlV=0;    //Cria a váriavel para receber o valor do sensor posteriormente
int SrV=0;
int led=A0;
void setup()              //setup é a parte do codigo que o arduino executa apenas uma vez
{
 pinMode(lm1,OUTPUT);     //Define o pino lm1 como saida de sinal
 pinMode(lm2,OUTPUT);
 pinMode(rm1,OUTPUT);
 pinMode(rm2,OUTPUT);
 pinMode(led,OUTPUT);
 pinMode(sl,INPUT);       //Define o pino sl como entrada de sinal
 pinMode(sr,INPUT);
sTOP();                   //Para o carrinho
}
void loop()               //loop é a parte do codigo que o arduino executa repetidamente até o arduino ser desligado
{
 SlV=digitalRead(sl);     //Lê o valor do pino sl(sensor esquerdo)
 SrV=digitalRead(sr);     //Lê o valor do pino sr(sensor direito)
 if(SrV==LOW && SlV== LOW) //Se os dois sensores lerem branco
 {
  ForWard();                //O carro anda para frente
   }
 if(SrV==HIGH && SlV== LOW) //Se o sensor da direita ler preto e o sensor da esquerda ler branco
 {
  Left();                   //Vira para esquerda
   }
 if(SrV==LOW && SlV== HIGH) //Se o sensor da esquerda ler preto e o sensor da direita ler branco
 { 
 Right();                   //Vira para direita
  }
    if(SrV==HIGH && SlV== HIGH) //Se os dois sensores lerem preto
 {
  sTOP();                     //O carrinho para
   }
}
void ForWard()              //Cria a função para o carrinho ir para frente
 {
  digitalWrite(lm1,HIGH); //Motor da esquerda 1 anda para frente
  digitalWrite(lm2,LOW);  //Motor da esquerda 2 para
  digitalWrite(rm1,HIGH); //Motor da direita 1 anda para frente
  digitalWrite(rm2,LOW);  //Motor da direita 2 para
 } 
 void BackWard()          //Cria a função para andar para tras
 {
  digitalWrite(lm1,LOW);  //Motor da esquerda 1 para
  digitalWrite(lm2,HIGH); //Motor da esquerda 2 anda para frente
  digitalWrite(rm1,LOW);  //Motor da direita 1 para
  digitalWrite(rm2,HIGH); //Motor da direita 2 anda para frente
 }      
 void Left()              //Cria a função para virar para a esquerda
 {
  digitalWrite(lm1,LOW);  //Motor da esquerda 1 para
  digitalWrite(lm2,HIGH); //Motor da esquerda 2 anda para frente
  digitalWrite(rm1,HIGH); //Motor da direita 1 anda para frente
  digitalWrite(rm2,LOW);  //Motor da direita 2 para
 } 
 void Right()             //Cria a função para virar para a direita
 {
  digitalWrite(lm1,HIGH); //Motor da esquerda 1 anda para frente
  digitalWrite(lm2,LOW);  //Motor da esquerda 2 para
  digitalWrite(rm1,LOW);  //Motor da direita 1 para
  digitalWrite(rm2,HIGH); //Motor da direita 2 anda para frente
 }  
   void sTOP()            //Cria a função para parar
 {
  digitalWrite(lm1,LOW);  //Motor da esquerda 1 para
  digitalWrite(lm2,LOW);  //Motor da esquerda 2 para
  digitalWrite(rm1,LOW);  //Motor da direita 1 para
  digitalWrite(rm2,LOW);  //Motor da direita 2 para
 }
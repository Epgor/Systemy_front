import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from '../../models/question';
import { Score } from 'src/app/models/score';
import { MatDialog } from '@angular/material/dialog';
import { QuizResultDialogComponent } from '../quiz-result-dialog/quiz-result-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-init-quiz',
  templateUrl: './init-quiz.component.html',
  styleUrls: ['./init-quiz.component.css']
})

export class InitQuizComponent implements OnInit {
  score: Score = {
    score: 0,
    maxScore: 0
  }
  isCompleted: boolean = false;
  points: number = 0;
  maxPoints: number = 0;
  checkColor = "primary";
  //OdpowiedziTest: Question[] = [];
  questionIndex: number = 0;
  quizId: number = 17;

  PytaniaTest = [
    {
      "pytanie": "Kiedy się uczę:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "lubię oglądać schematy",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "lubię omówić dany temat",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "używam przykładów",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Strona internetowa zawiera wideo przedstawiające jak wykonać specjalny diagram lub wykres. Jest tam osoba mówiąca, listy i słowa opisujące co należy zrobić oraz kilka diagramów. Najwięcej nauczyłbym się z:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "oglądania diagramów",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "słuchania",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "oglądania czynności",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Chcę nauczyć się robienia czegoś nowego na komputerze. Wówczas:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "lubię oglądać schematy",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "rady kogoś, kto robił to już wcześniej",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "oglądania wideo, na którym osoba składa podobny stół",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Potrzebuję znaleźć drogę do sklepu poleconego przez znajomego. Wówczas:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "używam mapy",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "proszę znajomego, żeby wskazał mi drogę",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "zapisuję kierunki uliczne, które muszę zapamiętać",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Chcę zaoszczędzić więcej pieniędzy i wybrać jedną z wielu opcji. Wówczas:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "używam wykresów przedstawiających różne opcje dla różnych okresów czasu",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "rozmawiam z ekspertem, na temat opcji",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "rozważam przykłady każdej opcji używając moich informacji finansowych",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Mam problem z sercem. Preferuję, aby doktor:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "pokazał mi schemat, co jest nie tak",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "opisał, co jest nie tak",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "używając plastikowego manekina pokazał mi, co jest nie tak",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Ukończyłem konkurs lub test i chciałbym jakiejś informacji zwrotnej. Chciałbym otrzymać informację zwrotną w postaci:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "diagramu pokazującego, co osiągnąłem",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "osoby, która omówi to ze mną",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "przykładów o tym czego dokonałem",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Kiedy uczę się z internetu, lubię:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "interesujący design i cechy wizualne",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "kanały audio, gdzie mogę posłuchać podcastów lub wywiadów",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "filmy pokazujące jak wykonać daną rzecz",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Chcę się nauczyć, jak robić lepsze zdjęcia. Wówczas:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "korzystam z diagramów przedstawiających aparat i co dany element robi",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "zadaję pytania oraz rozmawiam o aparacie i jego funkcjach",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "używam przykładów złych i dobrych zdjęć, pokazujących jak je poprawić",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Chcę nauczyć się w nową grę planszową lub karcianą. Wówczas:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "zanim dołączę do gry obserwuję, jak grają w nią inni",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "słucham osoby wyjaśniającej zasady gry i zadaję pytania",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "używam diagramów, które wyjaśniają różne etapy, ruchy i strategie w grze",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Preferuję prezentera lub nauczyciela, który używa:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "diagramów, wykresów, map lub schematóW",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "pytań i odpowiedzi, dyskusji grupowej lub mówcy",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "pokazów, modeli lub sesji praktycznych",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Chcę się dowiedzieć o nowym projekcie. Wówczas zapytam o:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "przykłady, w których projekt został pomyślnie wykorzystany",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "możliwość przedyskutowania projektu",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "diagramy pokazujące etapy projektu wraz z wykresami korzyści i kosztów",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Chcę zakupić mieszkanie lub dom. Przed wizytą chciałbym:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "obejrzeć film o tej nieruchomości",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "odbyć rozmowę z właścicielem",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "pisemnego opisu pomieszczeń i funkcji",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Chcę dowiedzieć się więcej na temat wycieczki, na którą się wybieram. Wówczas:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "używam mapy i wtedy widzę, gdzie znajdują się miejsca",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "rozmawiam z osobą, która zaplanowała wycieczkę lub z innymi uczestnikami wycieczki",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "patrzę na szczegóły dotyczące najważniejszych wydarzeń i działań podczas wycieczki",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
    {
      "pytanie": "Przy wyborze zawodu lub kierunku studiów ważne są dla mnie:",
      "odpowiedzi" : [
        {
          "trescOdpowiedzi": "praca z projektami, mapami, wykresami",
          "zaznaczone": false,
          "wartosc": "w"
        },
        {
          "trescOdpowiedzi": "komunikowanie się z innymi poprzez dyskusję",
          "zaznaczone": false,
          "wartosc": "s"
        },
        {
          "trescOdpowiedzi": "stosowanie mojej wiedzy w rzeczywistych sytuacjach",
          "zaznaczone": false,
          "wartosc": "k"
        }
      ]
    },
  ];

  constructor(
    private quizService: QuizService,
    public dialog: MatDialog,
    private location: Location,
  ) {}
  ngOnInit(): void {

  }

  checkAnswer(){
    let typKursanta = 0;
    let typKursantaText = "";
    let wynik = "";
    let wzrokowiec = 0;
    let sluchowiec = 0;
    let kinestetyk = 0;

    for(let pytanie of this.PytaniaTest)
    {
      for(let odpowiedz of pytanie.odpowiedzi)
      {
        if(odpowiedz.zaznaczone == true)
        {
          wynik += odpowiedz.wartosc;
        }
      }
    }
    let wynikTablica = wynik.split("");
    for(let znak of wynik)
    {
      let current = wynikTablica.pop();
      if (current == 'w')
        wzrokowiec++;
      if (current == 's')
        sluchowiec++;
      if (current == 'k')
        kinestetyk++;
    }

    let maksimum = Math.max(wzrokowiec, sluchowiec, kinestetyk);
    if (wzrokowiec == maksimum || wzrokowiec == maksimum-1)
    {
      typKursanta += 4;
      typKursantaText += "wzrokowiec";
    }

    if (sluchowiec == maksimum || wzrokowiec == maksimum-1)
    {
      typKursanta += 2;
      if(typKursanta > 0)
        typKursantaText +="/"
      typKursantaText += "słuchowiec";
    }

    if (kinestetyk == maksimum || wzrokowiec == maksimum-1)
    {
      typKursanta += 1;
      if(typKursanta > 0)
        typKursantaText +="/"
      typKursantaText += "/kinestetyk";
    }

    window.alert(`Typ kursanta: ${typKursantaText} \nKod: ${typKursanta}`);

    //this.isCompleted = true; 
  }

  next(): void{
    if (this.questionIndex < this.PytaniaTest.length)
      this.questionIndex ++;
  }

  previous(): void{
    if (this.questionIndex == 0)
      return
    this.questionIndex --;
  }

  goBack():void{
    this.location.back();
  }
}
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.response_selection import get_most_frequent_response
from chatterbot.comparisons import LevenshteinDistance
from chatterbot import comparisons, response_selection
from chatterbot.conversation import Statement
chatbot = ChatBot(
    'ORWELL',
    trainer='chatterbot.trainers.ListTrainer',
    storage_adapter='chatterbot.storage.MongoDatabaseAdapter', 
    database_uri='mongodb://localhost:27017/chatbot',
    input_adapter='chatterbot.input.TerminalAdapter', #indica que la pregunta se toma del terminal
    output_adapter='chatterbot.output.TerminalAdapter', #indeica que la respuesta se saca por el terminal
    
    logic_adapters=[ 
        #'chatterbot.logic.MathematicalEvaluation', #Este es un logic_adapter que responde preguntas sobre matemáticas en inglés
        #'chatterbot.logic.TimeLogicAdapter', #Este es un logic_adapter que responde preguntas sobre la hora actual en inglés
        
        {
            "import_path": "chatterbot.logic.BestMatch",
            "statement_comparison_function": "chatterbot.comparisons.levenshtein_distance",
            "response_selection_method": get_most_frequent_response,
        }

    ],
    
        preprocessors=[
        'chatterbot.preprocessors.clean_whitespace'
    ],
)
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train( './soporte.yml' )
levenshtein_distance = LevenshteinDistance()
#synset_distance = SynsetDistance()
#sentiment_comparison = SentimentComparison()
#jaccard_similarity = JaccardSimilarity()

disparate=Statement('Te has equivocado')#convertimos una frase en un tipo statement
entradaDelUsuario="" #variable que contendrá lo que haya escrito el usuario

while entradaDelUsuario!="adios":
    entradaDelUsuario = Statement(text=input()) #leemos la entrada del usuario
    respuesta = chatbot.generate_response(entradaDelUsuario)
    try:
        fecha = datetime_parsing(entradaDelUsuario.text)
        fecha = fecha[0]
        print(fecha[0])
    except:
        pass
    if levenshtein_distance.compare(entradaDelUsuario,disparate)>0.51:
        print('¿Qué debería haber dicho?')
        entradaDelUsuarioCorreccion = Statement(input())
        chatbot.learn_response(entradaDelUsuarioCorreccion,entradaDelUsuario)
        print("He aprendiendo que cuando digas {} debo responder {}".format(entradaDelUsuario.text,entradaDelUsuarioCorreccion.text))
    
    print(respuesta)
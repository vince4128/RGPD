<?php

/* constante */
//type possible
$_LANG = "lang";
$_DATA = "data";

//chemins
$_LANGPATH = 'app/lang/';
$_DATAPATH = 'data/';

/* utils */
//function pour générer un hash// pourquoi pas à externaliser ?
function makeHash()
{
    $uniqueId= time().'-'.mt_rand();
    return $uniqueId;
};

/* recuperation des donnees */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$type = $request->type;
$data = $request->data;
$lang = null;

if ($type === $_LANG) {
    $lang=$request->lang;
}

/* Que voulons-nous faire ? */

//faut-il uploader le fichier de langue ou de structure de données ?
switch ($type) {
    case $_LANG:
    /* mise à jour du text */

    //nom du fichier
    $newLangFile = $lang.".json";

    //renommer le fichier d'origine
    rename($_LANGPATH.$newLangFile, $_LANGPATH."-".$lang.makeHash().".json");

    /* remplacer le fichier d'origine */

    //vérifier que le fichier à bien été renommé
    if (!file_exists($_LANGPATH.$newLangFile)) {
        //écrire le fichier
        $fp = fopen($_LANGPATH.$newLangFile, 'w');

        if (fwrite($fp, $data) === false) {
            echo "Impossible d'écrire dans le fichier ($fp)";
            exit;
        }
    } else {
        echo "le fichier n'a pas bien été renommé";
    }

    echo "L'écriture dans le fichier ($fp) a réussi";

    fclose($fp);

    break;
    //////

    case $_DATA:
    //* mise a jour des data */

    //nom du fichier
    $newDataFile = "data.json";

    //renommer le fichier d'origine
    rename($_DATAPATH.$newDataFile, $_DATAPATH."data-".makeHash().".json");

    /* remplacer le fichier d'origine */

    //vérifier que le fichier à bien été renommé
    if (!file_exists($_DATAPATH.$newDataFile)) {
        //écrire le fichier
        $fp = fopen($_DATAPATH.$newDataFile, 'w');

        if (fwrite($fp, $data) === false) {
            echo "Impossible d'écrire dans le fichier ($fp)";
            exit;
        }
    } else {
        echo "le fichier n'a pas bien été renommé";
    }

    echo "L'écriture dans le fichier ($fp) a réussi";

    fclose($fp);

}

//c'est bien pratique le php des fois.

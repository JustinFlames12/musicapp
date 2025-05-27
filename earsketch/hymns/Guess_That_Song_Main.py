# Name: Guess_That_Song_Main
# Description: Python script that plays a random song with custom configurations provided by the user
from earsketch import *
import random
import math
import datetime

# Ask user to pass in configuration string from front-end
invalid_message = ""
while True:    
    user_config = readInput("{} Provide the following info (tempo,key,level_of_difficulty) seperated by commas (example: 100,-2,0)".format(invalid_message))
    user_config = user_config.split(',') # Split out the values from the user's configuration string
    try:
        user_config = [int(value) for value in user_config] # Change the values from user's configuration string into integers
        if user_config[0] < 80 or user_config[0] > 150 or user_config[1] < -12 or user_config[1] > 3 or user_config[2] < 0 or user_config[2] > 12: # Check to see that values passed from configuration are valid
            raise Exception("Invalid input.")
        break
    except:
        invalid_message = "Invalid Input. Please ensure you're passing in the correct information.\n"

# Set up tempo (between 80 and 150 inclusively)
tempo = user_config[0]
setTempo(tempo)

# Establish Parameters for rythym notes
quarter_note = 0.25
half_note = 0.5
eighth_note = 0.125
sixteenth_note = 0.0625
whole_note = 1.0
dotted_quarter_note = 0.375
dotted_eighth_note = 0.1875
dotted_half_note = 0.75

# Set up measure and beat counter variable
current_place = 1

# Set up instrument names
melody_instrument = JUSTINSAHEFIL1092_SYNTH_ORGAN_F
clap_instrument = JUSTINSAHEFIL1092_CLAP_AT_TWO_CHURCH_1_WAV

# Set up key signature (0 is key of F, 2 is key of G, etc.)
# Note: the last parameter for the setEffect used below must
# stay between -12 and 12.
# So: this means the key variable must stay between -12 and 0
key = user_config[1]

# Set up level of difficulty (between 0 and 12 inclusively)
lod = user_config[2]

# Initialize the track numbers that will be replaced with clapping sound
random_track_numbers = []

# Initialize the number of notes that will be used in the song
num_notes = 0

# Initialize the song name variable
song_name = ""

# Define the function for playing notes
def play_note(track: int, beat: float):
    global current_place  
    global random_track_numbers
    global melody_instrument
    global clap_instrument
    if track in random_track_numbers:
        if beat >= 1.0: # If beat is greater than or equal to a whole note
            # Play clap for half note and add in half rest
            fitMedia(clap_instrument, track, current_place, current_place + 0.5)
            current_place = current_place + beat
        else:
            fitMedia(clap_instrument, track, current_place, current_place + beat)
            current_place = current_place + beat
    else:
        fitMedia(melody_instrument, track, current_place, current_place + beat)
        current_place = current_place + beat

def get_random_track_numbers():
    global lod
    global num_notes
    global random_track_numbers
    # Set up number of notes to keep based on level of difficulty
    if lod != 0:
        num_notes_to_take = math.floor((lod * num_notes) / 12)
        track_numbers = [number for number in range(1, num_notes + 1)]
        random_track_numbers = random.sample(track_numbers, num_notes_to_take)
    else:
        num_notes_to_take = 0
    return random_track_numbers

def display_music_configuration():
    global song_name
    global tempo
    global key
    global lod
    global random_track_numbers
    global num_notes
    # Set up music configuration dictionary
    music_configuration = {
        'song_name': song_name,
        'tempo': tempo,
        'key': key,
        'level_of_difficulty': lod,
        'random_track_numbers_taken_out': random_track_numbers,
        'number_of_notes': num_notes,
        'timestamp': datetime.datetime.now()
    }
    print('Music Configuration Info seen below:')
    print(music_configuration)
    
def Holy_Holy_Holy():    
    global random_track_numbers
    global num_notes
    global song_name
    # Make variable for song name
    song_name = 'Holy, Holy, Holy'
    # Set up number of notes used in song
    num_notes = 8
    # Set up other notes used in song
    setEffect(1, PITCHSHIFT, PITCHSHIFT_SHIFT, 0 + key) #F
    setEffect(2, PITCHSHIFT, PITCHSHIFT_SHIFT, 4 + key) #A
    setEffect(3, PITCHSHIFT, PITCHSHIFT_SHIFT, 7 + key) #C
    setEffect(4, PITCHSHIFT, PITCHSHIFT_SHIFT, 9 + key) #D
    setEffect(5, PITCHSHIFT, PITCHSHIFT_SHIFT, 2 + key) #G
    setEffect(6, PITCHSHIFT, PITCHSHIFT_SHIFT, 12 + key) #F (up)
    setEffect(7, PITCHSHIFT, PITCHSHIFT_SHIFT, 11 + key) #E
    setEffect(8, PITCHSHIFT, PITCHSHIFT_SHIFT, 5 + key) #Bb
    # Randomly decide which track numbers that will be replaced with clapping sound
    random_track_numbers = get_random_track_numbers()
    display_music_configuration()
    # Play the song
    play_note(1, quarter_note)
    play_note(1, quarter_note)
    play_note(2, quarter_note)
    play_note(2, quarter_note)
    play_note(3, half_note)
    play_note(3, half_note)
    play_note(4, half_note)
    play_note(4, quarter_note)
    play_note(4, quarter_note)
    play_note(3, half_note)
    play_note(2, half_note)
    play_note(3, dotted_quarter_note)
    play_note(3, eighth_note)
    play_note(3, quarter_note)
    play_note(3, quarter_note)
    play_note(6, half_note)
    play_note(7, quarter_note)
    play_note(3, quarter_note)
    play_note(5, quarter_note)
    play_note(3, quarter_note)
    play_note(4, dotted_quarter_note)
    play_note(3, eighth_note)
    play_note(3, whole_note)
    play_note(1, quarter_note)
    play_note(1, quarter_note)
    play_note(2, quarter_note)
    play_note(2, quarter_note)
    play_note(3, half_note)
    play_note(3, half_note)
    play_note(4, dotted_quarter_note)
    play_note(4, eighth_note)
    play_note(4, quarter_note)
    play_note(4, quarter_note)
    play_note(3, half_note)
    play_note(2, half_note)
    play_note(6, half_note)
    play_note(3, quarter_note)
    play_note(3, quarter_note)
    play_note(4, half_note)
    play_note(2, half_note)
    play_note(8, quarter_note)
    play_note(5, quarter_note)
    play_note(5, dotted_quarter_note)
    play_note(1, eighth_note)
    play_note(1, whole_note)

def Abide_With_Me():
    global random_track_numbers
    global num_notes
    global song_name
    # Make variable for song name
    song_name = 'Abide With Me'
    # Set up number of notes used in song
    num_notes = 7
    # Set up other notes used in song
    setEffect(1, PITCHSHIFT, PITCHSHIFT_SHIFT, 4 + key) #A
    setEffect(2, PITCHSHIFT, PITCHSHIFT_SHIFT, 2 + key) #G
    setEffect(3, PITCHSHIFT, PITCHSHIFT_SHIFT, 0 + key) #F
    setEffect(4, PITCHSHIFT, PITCHSHIFT_SHIFT, 7 + key) #C
    setEffect(5, PITCHSHIFT, PITCHSHIFT_SHIFT, 9 + key) #D
    setEffect(6, PITCHSHIFT, PITCHSHIFT_SHIFT, 5 + key) #Bb
    setEffect(7, PITCHSHIFT, PITCHSHIFT_SHIFT, 6 + key) #B
    # Randomly decide which track numbers that will be replaced with clapping sound
    random_track_numbers = get_random_track_numbers()
    display_music_configuration()
    # Play the song
    play_note(1, half_note)
    play_note(1, quarter_note)
    play_note(2, quarter_note)
    play_note(3, half_note)
    play_note(4, half_note)
    play_note(5, quarter_note)
    play_note(4, quarter_note)
    play_note(4, quarter_note)
    play_note(6, quarter_note)
    play_note(1, whole_note)
    play_note(1, half_note)
    play_note(6, quarter_note)
    play_note(4, quarter_note)
    play_note(5, half_note)
    play_note(4, half_note)
    play_note(6, quarter_note)
    play_note(2, quarter_note)
    play_note(1, quarter_note)
    play_note(7, quarter_note)
    play_note(4, whole_note)
    play_note(1, half_note)
    play_note(1, quarter_note)
    play_note(2, quarter_note)
    play_note(3, half_note)
    play_note(4, half_note)
    play_note(4, quarter_note)
    play_note(6, quarter_note)
    play_note(6, quarter_note)
    play_note(1, quarter_note)
    play_note(2, whole_note)
    play_note(2, half_note)
    play_note(1, quarter_note)
    play_note(6, quarter_note)
    play_note(1, quarter_note)
    play_note(2, quarter_note)
    play_note(3, quarter_note)
    play_note(6, quarter_note)
    play_note(1, half_note)
    play_note(2, half_note)
    play_note(3, whole_note)

def Amazing_Grace():
    global random_track_numbers
    global num_notes
    global song_name
    # Make variable for song name
    song_name = 'Amazing Grace'
    # Set up number of notes used in song
    num_notes = 6
    # Set up other notes used in song
    setEffect(1, PITCHSHIFT, PITCHSHIFT_SHIFT, -5 + key) #C (low)
    setEffect(2, PITCHSHIFT, PITCHSHIFT_SHIFT, 0 + key) #F
    setEffect(3, PITCHSHIFT, PITCHSHIFT_SHIFT, 4 + key) #A
    setEffect(4, PITCHSHIFT, PITCHSHIFT_SHIFT, 2 + key) #G
    setEffect(5, PITCHSHIFT, PITCHSHIFT_SHIFT, -3 + key) #D (low)
    setEffect(6, PITCHSHIFT, PITCHSHIFT_SHIFT, 7 + key) #C
    # Randomly decide which track numbers that will be replaced with clapping sound
    random_track_numbers = get_random_track_numbers()
    display_music_configuration()
    # Play the song
    play_note(1, quarter_note)
    play_note(2, half_note)
    play_note(3, eighth_note)
    play_note(2, eighth_note)
    play_note(3, half_note)
    play_note(4, quarter_note)
    play_note(2, half_note)
    play_note(5, quarter_note)
    play_note(1, half_note)
    play_note(1, quarter_note)
    play_note(2, half_note)
    play_note(3, eighth_note)
    play_note(2, eighth_note)
    play_note(3, half_note)
    play_note(4, quarter_note)
    play_note(6, dotted_half_note + half_note)
    play_note(3, quarter_note)
    play_note(6, dotted_quarter_note)
    play_note(3, eighth_note)
    play_note(6, eighth_note)
    play_note(3, eighth_note)
    play_note(2, half_note)
    play_note(1, quarter_note)
    play_note(5, dotted_quarter_note)
    play_note(2, eighth_note)
    play_note(2, eighth_note)
    play_note(5, eighth_note)
    play_note(1, half_note)
    play_note(1, quarter_note)
    play_note(2, half_note)
    play_note(3, eighth_note)
    play_note(2, eighth_note)
    play_note(3, half_note)
    play_note(4, quarter_note)
    play_note(2, dotted_half_note + half_note)

# Choose a random song to play
song_bank = [Holy_Holy_Holy, Abide_With_Me, Amazing_Grace]
# Randomly select and execute one function
random.choice(song_bank)()
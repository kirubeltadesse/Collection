from front_end import process_input
import plotly as py
from plotly.offline import plot
import plotly.graph_objs as go

import pandas as pd
import numpy as np

# my_obj = data_input("2018-01-01", "2018-08-10", "94558",
#                     "POLYGON((-122.331277 38.358624,-122.328230 38.359600,-122.327522 38.358119,-122.330526 38.357093,-122.331277 38.358624))",
#                     soil_type="", irrigation_type="")
# my_obj = data_input("2018-01-01","2018-08-10", "94558", "POLYGON((-122.331277 38.358624,-122.328230 38.359600,-122.327522 38.358119,-122.330526 38.357093,-122.331277 38.358624))")
# data = my_obj.get_cummulative()
# print(data)

def init(start, end, poly, zip, soil_type, irrigation_type):
    return process_input.data_input(start, end, poly, zip, soil_type, irrigation_type)

def plot_Kc(data):
    data_Kc = [go.Scatter(x=data.index,
                          y=data.Kc_values,name='Daily Crop Coefficient',
                          fill='tozeroy',fillcolor ='rgba(179, 255, 179,0.2)')]
    layout = dict(title = 'Crop Coeffcient',
                  yaxis = dict(title='Daily Crop Coefficient'),
                  xaxis=dict(
                      rangeselector=dict(
                          buttons=list([
                              dict(count=1,
                                   label='1m',
                                   step='month',
                                   stepmode='backward'),
                              dict(count=6,
                                   label='6m',
                                   step='month',
                                   stepmode='backward'),
                              dict(step='all')])
                      ),
                      rangeslider=dict(
                          visible = True
                      ),
                      type='date'
                  )
                  )
    fig = dict(data=data_Kc, layout=layout)
    #     kcplot = py.offline.plot(fig, output_type='div', include_plotlyjs=False)
    kcplot = ply.iplot(fig, output_type='div', include_plotlyjs=False)
    return kcplot


def plot_Cropwateruse(data):
    trace1 = go.Scatter(
        x=data.index,
        y=data['Etc_values'], #[-self.n_days:],
        name='Crop Water Use',
        mode = 'markers',
        marker = dict(
            size = 10,
            color = 'rgba(152, 0, 0, .8)',
            line = dict(
                width = 2,
                color = 'rgb(0, 0, 0)'
            )
        )
    )
    trace2 = go.Scatter(
        x=data.index,
        y=data['Etc_cum'],
        fill='tozeroy',
        fillcolor ='rgba(0,100,80,0.2)',
        name='Cummulative Evapotranspiration',
        yaxis='y2'
    )
    dataplot = [trace1, trace2]
    layout = go.Layout(
        title='Daily Evapotranspiration',
        yaxis=dict(
            title='Daily Evapotranspiration'
        ),
        yaxis2=dict(
            title='Cummulative Evapotranspiration',
            titlefont=dict(
                color='rgb(148, 103, 189)'
            ),
            overlaying='y',
            side='right'
        ),
        xaxis=dict(
            rangeselector=dict(
                buttons=list([
                    dict(count=1,
                         label='1m',
                         step='month',
                         stepmode='backward'),
                    dict(count=6,
                         label='6m',
                         step='month',
                         stepmode='backward'),
                    dict(step='all')])
            ),
            rangeslider=dict(
                visible = True
            ),
            type='date'
        )
    )
    fig = go.Figure(data=dataplot, layout=layout)
    cropplot= py.offline.plot(fig, output_type='div', include_plotlyjs=False)
    # cropplot= py.offline.plot(fig)
    #     kcplot = py.offline.plot(fig, output_type='div', include_plotlyjs=False)
    # kcplot = ply.iplot(fig, output_type='div', include_plotlyjs=False)
    return cropplot

def plot_soil_deficit_after(data,irrigate=0,datei='2018-09-01'):
    df4 = my_obj.irrigation(2, "2018-02-03")
    #     df4= irrigation(self.df3,self.n_days,irrigate, datei)
    #df3=self.irrigation(irrigate,datei)
    trace1 = go.Scatter(
        x=df4.index,
        y=df4.Etc_cum/(before*0.01),
        name='Cummulative Evapotranspiration'
    )
    trace2 = go.Scatter(
        x=df4.index,
        y=df4.Soil_Water_Deficit_cum,
        name='Cummulative Soil Water Deficit'
    )
    trace3 = go.Scatter(
        x=df4.index,
        y=np.zeros(len(df4)),
        name='Initial Level'
    )
    trace4 = go.Bar(
        x=df4.index,
        y=df4.DayPrecip,
        name='Rainfall(inches)'
    )
    data = [trace1, trace2, trace3, trace4]
    layout = go.Layout(
        title='Soil Water Deficit',
        xaxis=dict(
            title='Date',
        ),
    )
    fig = go.Figure(data=data, layout=layout)
    return ply.iplot(fig, output_type='div', include_plotlyjs=False)

def plot_efficiency(data):
    before_efficiency,after_efficiency = my_obj.get_efficience(3,"Sand")
    data['Before_Change']=data.Etc_cum/(before_efficiency*0.01)
    data['After_Change']=data.Etc_cum/(after_efficiency*0.01)
    total_water_saved=data.After_Change[-1:]-data.Before_Change[-1:]

    trace1 = go.Scatter(
        x=data.index,
        y=data.Before_Change,
        name='Before change(Inches)',
        fill='tozeroy',
        fillcolor ='rgba(0,100,80,0.2)',
    )
    trace2 = go.Scatter(
        x=data.index,
        y=data.After_Change,
        name='After Change(Inches)',
        fill='tozeroy',
        fillcolor='rgb(0,176,246)',

    )
    layout = go.Layout(
        title='Irrigation Water Use',
        yaxis=dict(
            title='Cummulative Water use'
        ),
        xaxis=dict(
            title='Date'
        ),
    )
    data = [trace1, trace2]
    fig = go.Figure(data=data, layout=layout)
    return ply.iplot(fig, output_type='div', include_plotlyjs=False)
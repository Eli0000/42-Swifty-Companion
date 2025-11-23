import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { IPoject, ISearchResult, ISkill, IUser } from '@/lib/types';
import { Image } from 'expo-image';
import { Dispatch, JSX, SetStateAction, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';

const UserTab = ({ user }: { user: IUser }) => {
  return (
    <ThemedView>
      <ThemedView style={styles.info}>
        <ThemedText style={{ fontWeight: 'bold' }}>Nom:</ThemedText>
        <ThemedText>{user.displayname}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.info}>
        <ThemedText style={{ fontWeight: 'bold' }}>Email:</ThemedText>
        <ThemedText>{user.email}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.info}>
        <ThemedText style={{ fontWeight: 'bold' }}>Wallet:</ThemedText>
        <ThemedText>{user.wallet}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.info}>
        <ThemedText style={{ fontWeight: 'bold' }}>Phone:</ThemedText>
        <ThemedText>{user.phone}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.info}>
        <ThemedText style={{ fontWeight: 'bold' }}>Point de correction:</ThemedText>
        <ThemedText>{user.correction_point}</ThemedText>
      </ThemedView>
      {user.pool_year && (
        <ThemedView style={styles.info}>
          <ThemedText style={{ fontWeight: 'bold' }}>Année de la piscine:</ThemedText>
          <ThemedText>{user.pool_year}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const SkillsTab = ({ skills }: { skills: ISkill[] }) => {
  return (
    <ThemedView>
      {skills.map((skill) => (
        <ThemedView key={'skill' + skill.name} style={{ ...styles.info, flexDirection: 'column' }}>
          <ThemedText>{skill.name}</ThemedText>
          <Progress.Circle
            size={90}
            progress={skill.level / 30}
            showsText={true}
            formatText={(_) =>{return (<View style={{alignItems : 'center'}}><ThemedText>{skill.level}</ThemedText><ThemedText>{`${(skill.level /30*100).toPrecision(3)}%`}</ThemedText></View>)}}
          />
        </ThemedView>
      ))}
    </ThemedView>
  );
};

const ProjectTabs = ({ project }: { project: IPoject[] }) => {
  return (
    <ThemedView>
      {project.map((project) =>
        project.status === 'finished' ? (
          <ThemedView style={styles.info} key={'project' + project.project.name}>
            <ThemedText style={{ color: project['validated?'] ? 'green' : 'red' }}>
              {project.project.name}
            </ThemedText>
          </ThemedView>
        ) : null
      )}
    </ThemedView>
  );
};

type TabType = 'user' | 'skills' | 'projects';

const LoginResult = ({
  res,
  setSearchResult,
}: {
  setSearchResult: Dispatch<SetStateAction<ISearchResult | null>>;
  res: ISearchResult;
}) => {
  const [tab, setTab] = useState<TabType>('user');

  const cursus = res.cursus_users[res.cursus_users.length - 1];
  const levelPercentage = (cursus.level / 21) * 100;

  const tabComponant: Record<TabType, JSX.Element> = {
    user: <UserTab user={{ ...res }} />,
    skills: <SkillsTab skills={cursus.skills} />,
    projects: <ProjectTabs project={res.projects_users} />,
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          style={styles.headerImage}
          source={res.image.link}
          contentFit="cover"
          transition={1000}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <TouchableOpacity style={{ marginRight: 'auto' }} onPress={() => setSearchResult(null)}>
          <ThemedText style={{ fontSize: 40, color: '#ffffff66' }}>↵</ThemedText>
        </TouchableOpacity>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
            textTransform: 'capitalize',
            color: '#bdc28fad',
          }}
        >
          {res.login}
        </ThemedText>
        <ThemedText
          style={{
            fontFamily: Fonts.rounded,
            textTransform: 'capitalize',
          }}
        >
          {cursus.grade}
        </ThemedText>
        <Progress.Bar progress={cursus.level / 21} height={25} width={200} color={'#005544e2'}>
          <ThemedText style={styles.absoluteCenter}>{levelPercentage.toPrecision(4)} %</ThemedText>
        </Progress.Bar>
        <ThemedText>Level {cursus.level}</ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedView style={styles.tabBar}>
          <Button
            color={tab == 'user' ? '#0ed1beb2' : '#0ed1be4a'}
            title="USER"
            onPress={() => setTab('user')}
          />
          <Button
            color={tab == 'skills' ? '#0ed1beb2' : '#0ed1be4a'}
            title="SKILLS"
            onPress={() => setTab('skills')}
          />
          <Button
            color={tab == 'projects' ? '#0ed1beb2' : '#0ed1be4a'}
            title="PROJECTS"
            onPress={() => setTab('projects')}
          />
        </ThemedView>

        {tabComponant[tab]}
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  headerImage: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
  titleContainer: {
    flex: 1,
    padding: 0,
    margin: 0,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
    paddingTop: 30,
  },

  absoluteCenter: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    gap: 10,
    alignItems: 'center',
  },
});

export default LoginResult;
